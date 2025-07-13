import { makeAutoObservable } from 'mobx';
import { createApiClient } from '../api/ky.client';
import {MovieStore} from "./MovieStore.ts";

export class RootStore {
    apiClient: ReturnType<typeof createApiClient>;
    movieStore: MovieStore;

    constructor() {
        this.apiClient = createApiClient();
        this.movieStore = new MovieStore(this.apiClient);
        makeAutoObservable(this);
    }
}

export const rootStore = new RootStore();