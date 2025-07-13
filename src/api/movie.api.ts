import type {KyInstance} from "ky";
import type {Movie} from "../models/Movie.ts";

export interface MovieFilterParams {
    ids: number[] | undefined
    page: number
    limit: number
    genres: string[]
    minRating: number
    maxRating: number
    minYear: number
    maxYear: number
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
        if(filter.ids?.length === 0) {
            return {
                docs: [],
                total: 0,
                limit: filter.limit,
                page: filter.page,
                pages: 1
            }
        }

        const params = new URLSearchParams();
        params.append("page", filter.page.toString())
        params.append("limit", filter.limit.toString())
        params.append("year", `${filter.minYear}-${filter.maxYear}`)
        params.append("rating.kp", `${filter.minRating}-${filter.maxRating}`)
        filter.genres.map(it => params.append('genres.name', it))
        filter.ids?.map(it => params.append('id', it.toString()))

        return await this.ky.get(`movie`, {
            searchParams: params
        }).json<MoviesResponse>()
    }
}