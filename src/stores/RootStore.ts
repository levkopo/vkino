import { makeAutoObservable } from 'mobx';
import { createApiClient } from '../api/ky.client';
import {MovieStore} from "./MovieStore.ts";
import {MovieFavoriteStore} from "./MovieFavoriteStore.ts";

export class RootStore {
    apiClient: ReturnType<typeof createApiClient>;
    movieStore: MovieStore;
    movieFavoriteStore: MovieFavoriteStore;

    constructor() {
        this.apiClient = createApiClient();
        this.movieStore = new MovieStore(this.apiClient);
        this.movieFavoriteStore = new MovieFavoriteStore();
        makeAutoObservable(this);
    }
}

export const rootStore = new RootStore();