import type {KyInstance} from "ky";
import type {Movie} from "../models/Movie.ts";

export class MovieService {
    private ky: KyInstance;

    constructor(ky: KyInstance) {
        this.ky = ky;
    }

    async fetchById(movieId: number): Promise<Movie> {
        return await this.ky.get(`movie/${movieId}`).json<Movie>()
    }
}