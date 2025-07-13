import {autorun, makeAutoObservable, runInAction} from "mobx";

export const FAVORITES_STORAGE_KEY = "movie_favorites"

export class MovieFavoriteStore {
    favoriteMovieIds: number[] = [];

    constructor() {
        makeAutoObservable(this);
        this.loadFavoritesFromLocalStorage();

        autorun(() => {
            this.saveFavoritesToLocalStorage();
        });
    }

    loadFavoritesFromLocalStorage() {
        try {
            const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
            if (storedFavorites) {
                const parsedIds = JSON.parse(storedFavorites);
                if (Array.isArray(parsedIds) && parsedIds.every(id => typeof id === 'number')) {
                    runInAction(() => {
                        this.favoriteMovieIds = parsedIds;
                    });
                }
            }
        } catch (error) {
            console.error('Failed to load favorites from localStorage:', error);
            localStorage.removeItem(FAVORITES_STORAGE_KEY);
        }
    }

    saveFavoritesToLocalStorage() {
        try {
            localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(this.favoriteMovieIds));
        } catch (error) {
            console.error('Failed to save favorites to localStorage:', error);
        }
    }

    addFavorite(movieId: number) {
        if (!this.favoriteMovieIds.includes(movieId)) {
            this.favoriteMovieIds.push(movieId);
        }
    }

    removeFavorite(movieId: number) {
        this.favoriteMovieIds = this.favoriteMovieIds.filter(id => id !== movieId);
    }

    isFavorite(movieId: number): boolean {
        return this.favoriteMovieIds.includes(movieId);
    }
}