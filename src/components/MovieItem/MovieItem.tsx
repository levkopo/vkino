import type {Movie} from "../../models";
import {Card, type CardProps, classNames, Flex, Footnote, Tappable, Title} from "@vkontakte/vkui";
import {useNavigate} from "react-router";
import {Icon16StarAlt} from "@vkontakte/icons";
import {MoviePoster} from "../MoviePoster/MoviePoster.tsx";
import "./MovieItem.css"

export interface MovieItemProps extends CardProps {
    movie: Movie
}

export const MovieItem = (props: MovieItemProps) => {
    const {
        movie,
        className,
        ...rest
    } = props

    const navigate = useNavigate()

    return <Card className={classNames("MovieItem", className)} {...rest}>
        <Tappable onClick={() => {
            navigate(`/movie/${movie.id}`)
        }} className="MovieItem--inner">
            <MoviePoster
                movie={movie}
                className="MovieItem-poster"/>

            <div className="MovieItem--info">
                <Title
                    level="3"
                    className="MovieItem--info-title"
                >{movie.name ?? movie.alternativeName}</Title>

                <div className="MovieItem--info-subtitle">
                    <Footnote caps>{movie.year}</Footnote>

                    <Flex gap="2xs">
                        <Footnote>{Math.floor(movie.rating.kp * 10) / 10}</Footnote>
                        <Icon16StarAlt/>
                    </Flex>
                </div>
            </div>
        </Tappable>
    </Card>
}