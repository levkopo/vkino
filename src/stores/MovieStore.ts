import type {Movie} from "../models/Movie.ts";
import type {KyInstance} from "ky";
import {makeAutoObservable, observable, runInAction} from "mobx";
import {MovieService} from "../api/movie.api.ts";

export class MovieStore {
    movieCache = observable.map<number, Movie>();
    isLoadingMovieById: number | null = null;
    movieByIdError: Record<number, string> = {};


    private movieService: MovieService;

    constructor(ky: KyInstance) {
        this.movieService = new MovieService(ky);
        makeAutoObservable(this);
    }

    async fetchMovieById(movieId: number) {
        if (this.isLoadingMovieById === movieId || this.movieCache.has(movieId)) {
            return;
        }

        this.isLoadingMovieById = movieId;
        delete this.movieByIdError[movieId];

        try {
            const movie = await this.movieService.fetchById(movieId);

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

    movieById(movieId: number): Movie | undefined {
        return this.movieCache.get(movieId);
    }
}