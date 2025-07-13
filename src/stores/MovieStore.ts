import type {Movie} from "../models";
import type {KyInstance} from "ky";
import {computed, makeAutoObservable, observable, runInAction} from "mobx";
import {type MovieFilterParams, MovieService} from "../api";

export const DEFAULT_MIN_RATING = 0
export const DEFAULT_MAX_RATING = 10

export const DEFAULT_MIN_YEAR = 1990
export const DEFAULT_MAX_YEAR = new Date().getFullYear()


export class MovieStore {
    movieCache = observable.map<number, Movie>();
    isLoadingMovieById: number | null = null;
    movieByIdError: Record<number, string> = {};

    movies: Movie[] = [];
    ids: number[] | undefined = undefined
    currentPage: number = 1;
    pageSize: number = 50;
    isLoadingMovies: boolean = false;
    hasMoreMovies: boolean = true;
    moviesError: string | null = null;
    totalMovieResults: number = 0;

    @observable genres: string[] = [];

    @observable selectedGenres: string[] = [];
    @observable minRating: number = DEFAULT_MIN_RATING;
    @observable maxRating: number = DEFAULT_MAX_RATING;
    @observable minYear: number = DEFAULT_MIN_YEAR;
    @observable maxYear: number = DEFAULT_MAX_YEAR;

    private movieService: MovieService;

    constructor(ky: KyInstance) {
        this.movieService = new MovieService(ky);
        makeAutoObservable(this);
    }

    @computed
    get currentFilters(): MovieFilterParams {
        return {
            page: this.currentPage,
            limit: this.pageSize,
            ids: this.ids,
            genres: this.selectedGenres.length > 0 ? this.selectedGenres : [],
            minRating: this.minRating > DEFAULT_MIN_RATING ? this.minRating : DEFAULT_MIN_RATING,
            maxRating: this.maxRating < DEFAULT_MAX_RATING ? this.maxRating : DEFAULT_MAX_RATING,
            minYear: this.minYear > DEFAULT_MIN_YEAR ? this.minYear : DEFAULT_MIN_YEAR,
            maxYear: this.maxYear < DEFAULT_MAX_YEAR ? this.maxYear : DEFAULT_MAX_YEAR,
        };
    }

    @computed
    get filtersCount(): number {
        let count = 0
        if(this.selectedGenres.length != 0) {
            count++
        }

        if(this.minRating != DEFAULT_MIN_RATING || this.maxRating != DEFAULT_MAX_RATING) {
            count++
        }

        if(this.minYear != DEFAULT_MIN_YEAR || this.maxYear != DEFAULT_MAX_YEAR) {
            count++
        }

        return count
    }

    async fetchMovies(append: boolean = true) {
        if (this.isLoadingMovies) {
            return;
        }

        if (append && !this.hasMoreMovies) {
            return;
        }

        this.isLoadingMovies = true;
        this.moviesError = null;

        try {
            const filtersToApply = { ...this.currentFilters, page: this.currentPage, limit: this.pageSize };
            const response = await this.movieService.getMovies(filtersToApply);

            runInAction(() => {
                if (append) {
                    this.movies.push(...response.docs);
                } else {
                    this.movies = response.docs;
                }

                this.genres = [
                    ...new Set(
                        response.docs.reduce((prev: string[], next) =>
                            next.genres ? [...prev, ...next.genres.map(it => it.name)]: prev, [])
                    )
                ]
                this.totalMovieResults = response.total;
                this.hasMoreMovies = this.currentPage < response.total;
                this.isLoadingMovies = false;
            });
        } catch (error: unknown) {
            runInAction(() => {
                this.moviesError = 'Failed to load movies';
                this.isLoadingMovies = false;
                console.error('Error fetching movies:', error);
            });
        }
    }

    async fetchMovieById(movieId: number) {
        if (this.isLoadingMovieById === movieId || this.movieCache.has(movieId)) {
            return;
        }

        this.isLoadingMovieById = movieId;
        delete this.movieByIdError[movieId];

        try {
            const movie = await this.movieService.getById(movieId);

            runInAction(() => {
                this.movieCache.set(movieId, movie);
                this.isLoadingMovieById = null;
            });
        } catch (error: unknown) {
            runInAction(() => {
                this.movieByIdError[movieId] =  `Failed to fetch movie ${movieId}`;
                this.isLoadingMovieById = null;
                console.error(`Error fetching movie ${movieId}:`, error);
            });
        }
    }

    async loadNextPage() {
        if (!this.hasMoreMovies || this.isLoadingMovies) {
            return;
        }
        this.currentPage++;
        await this.fetchMovies(true);
    }

    setGenreFilter(genres: string[]) {
        this.selectedGenres = genres;
    }

    setRatingRange(min?: number, max?: number) {
        this.minRating = Math.max(DEFAULT_MIN_RATING, min || DEFAULT_MIN_RATING);
        this.maxRating = Math.min(DEFAULT_MAX_RATING, max || DEFAULT_MAX_RATING);
    }

    setIds(ids?: number[] | undefined) {
        this.ids = ids
    }

    setYearRange(min?: number, max?: number) {
        this.minYear = Math.max(DEFAULT_MIN_YEAR, min || DEFAULT_MIN_YEAR);
        this.maxYear = Math.min(DEFAULT_MAX_YEAR, max || DEFAULT_MAX_YEAR);
    }

    resetMovieList() {
        this.movies = [];
        this.currentPage = 1;
        this.hasMoreMovies = true;
        this.moviesError = null;
    }

    resetAllFilters() {
        this.selectedGenres = [];
        this.minRating = DEFAULT_MIN_RATING;
        this.maxRating = DEFAULT_MAX_RATING;
        this.minYear = DEFAULT_MIN_YEAR;
        this.maxYear = DEFAULT_MAX_YEAR;
    }

    movieById(movieId: number): Movie | undefined {
        return this.movieCache.get(movieId);
    }
}