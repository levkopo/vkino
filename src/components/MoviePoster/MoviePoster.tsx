import type {Movie} from "../../models";
import {Icon56LogoVk} from "@vkontakte/icons";
import type {HTMLAttributes} from "react";
import {classNames, Footnote} from "@vkontakte/vkui";
import "./MoviePoster.css"

export interface MoviePosterProps extends HTMLAttributes<HTMLDivElement>{
    movie: Movie
}

export const MoviePoster = (props: MoviePosterProps) => {
    const {
        movie: {
            poster,
            ageRating
        },
        className,
        ...rest
    } = props

    return <div className={classNames("MoviePoster", className)} {...rest}>
        <div className="MoviePoster--backdrop"
        >
            <Icon56LogoVk/>
        </div>

        <img src={poster?.previewUrl}
             alt=""
             className="MoviePoster--image"
             onLoad={(it) => {
                 it.currentTarget.setAttribute("loaded", '1')
             }}/>

        {ageRating && <Footnote
            caps
            className="MoviePoster--age-rating"
        >
            {ageRating}+
        </Footnote>}
    </div>
}