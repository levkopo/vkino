export type MovieGenre = {
    name: string
}

export type Movie = {
    id: number
    name: string
    description: string
    showDescription: string
    year: number
    rating: {
        kp: number
        imdb: number
        tmdb: number
        filmCritics: number
        russianFilmCritics: number
        await: number
    }
    ageRating: number
    poster: {
        url: string,
        previewUrl: string
    },
    genres: MovieGenre[]
}