import type {Movie} from "../../models";
import {Flex} from "@vkontakte/vkui";
import "./MovieRating.css"
import {MovieRatingCell} from "./MovieRatingCell.tsx";

export interface MovieRatingProps {
    rating: Movie['rating']
}


export const MovieRating = (props: MovieRatingProps) => {
    const {
        rating: {
            kp,
            imdb,
            filmCritics,
            russianFilmCritics
        }
    } = props

    return <Flex noWrap={true}>
        <MovieRatingCell
            className="MovieRating--primary"
            label="Рейтинг фильма"
            value={kp}
            maxValue={10}
        />

        <MovieRatingCell
            mode="secondary"
            label="Imdb"
            value={imdb}
            maxValue={10}
        />

        <MovieRatingCell
            mode="secondary"
            label="Критики"
            value={filmCritics}
            maxValue={10}
        />

        <MovieRatingCell
            mode="secondary"
            label="В России"
            value={russianFilmCritics}
            maxValue={100}
        />
    </Flex>
}