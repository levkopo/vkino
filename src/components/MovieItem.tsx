import type {Movie} from "../models/Movie.ts";
import {Card, Flex, Footnote, Tappable, Title} from "@vkontakte/vkui";
import {useNavigate} from "react-router";
import {Icon16StarAlt} from "@vkontakte/icons";
import {MoviePoster} from "./MoviePoster.tsx";

export interface MovieItemProps {
    movie: Movie
}

export const MovieItem = (props: MovieItemProps) => {
    const {movie} = props
    const navigate = useNavigate()

    return <Card style={{
        overflow: 'hidden',
    }}>
        <Tappable onClick={() => {
            navigate(`/movie/${movie.id}`)
        }} style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        }}>
            <MoviePoster
                movie={movie}
                style={{
                    width: "100%",
                }}/>


            <div style={{
                marginTop: 12,
                paddingLeft: 12,
                paddingRight: 12,
                paddingBottom: 12,
                display: 'flex',
                flexDirection: 'column',
                flex: 1
            }}>
                <Title
                    level="3"
                    style={{
                        flex: 1
                    }}
                >{movie.name ?? movie.alternativeName}</Title>

                <div
                    style={{
                        marginTop: 12,
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
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