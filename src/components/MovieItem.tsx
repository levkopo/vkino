import type {Movie} from "../models/Movie.ts";
import {Card, Footnote, Tappable, Text, Title} from "@vkontakte/vkui";
import {useNavigate} from "react-router";

export interface MovieItemProps {
    movie: Movie
}

export const MovieItem = (props: MovieItemProps) => {
    const { movie } = props
    const navigate = useNavigate()

    return <Card style={{
        overflow: 'hidden',
    }}>
        <Tappable onClick={() => {
            navigate(`/movie/${movie.id}`)
        }}>
            <img src={movie.poster.previewUrl} alt={movie.name} style={{
                objectFit: 'cover',
                maxWidth: 200

            }}/>

            <div style={{
                marginTop: 6,
                paddingLeft: 12,
                paddingRight: 12,
                paddingBottom: 12,
            }}>
                <Title
                    level="3"
                    style={{}}
                >{movie.name}</Title>
                <div
                    style={{
                        marginTop: 4,
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Footnote caps>{movie.year}</Footnote>
                    <Footnote>{movie.rating.kp} ⭐</Footnote>
                </div>
            </div>
        </Tappable>
    </Card>
}