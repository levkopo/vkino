import type {KyInstance} from "ky";
import type {Movie} from "../models/Movie.ts";
import {removeEmptyValues} from "../utls";

export interface MovieFilterParams {
    page: number;
    limit: number;
    genres: string[];
    minRating: number;
    maxRating: number;
    minYear: number;
    maxYear: number;
}

export interface MoviesResponse {
    docs: Movie[]
    total: number
    limit: number
    page: number
    pages: number
}

export class MovieService {
    private ky: KyInstance;

    constructor(ky: KyInstance) {
        this.ky = ky;
    }

    async getById(movieId: number): Promise<Movie> {
        return await this.ky.get(`movie/${movieId}`).json<Movie>()
    }

    async getMovies(filter: MovieFilterParams): Promise<MoviesResponse> {
        // return {
        //     docs: Array.from({ length: filter.limit+1 }).map(() => mockMovie),
        //     total: 9999999999999,
        //     limit: filter.limit,
        //     page: filter.page,
        //     pages: 9999999999999,
        //
        // }
        return await this.ky.get(`movie`, {
            searchParams: removeEmptyValues({
                page: filter.page,
                limit: filter.limit,
                year: `${filter.minYear}-${filter.maxYear}`,
                'rating.kp': `${filter.minRating}-${filter.maxRating}`,
                'genres.name': filter.genres.join(','),
            })
        }).json<MoviesResponse>()
    }
}