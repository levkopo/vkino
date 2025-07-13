import type {Movie} from "../models/Movie.ts";
import {Div, Flex, Group, Title} from "@vkontakte/vkui";
import {getColorByPercentage} from "../utils";

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

    return <Group>
        <Flex noWrap={true}>
            <Div style={{
                flex: 1
            }}>
                <Title level="3" weight="2">Рейтинг фильма</Title>
                <Title level="1" style={{
                    marginTop: 10,
                    color: getColorByPercentage(kp / 10)
                }}>{Math.floor(kp * 10) / 10}</Title>
            </Div>

            {
                <Div>
                    <Title level="3" weight="3">Imdb</Title>
                    <Title level="1" style={{
                        marginTop: 10,
                        color: getColorByPercentage(imdb / 10)
                    }}>
                        {Math.floor(imdb * 10) / 10}
                    </Title>
                </Div>
            }

            {
                <Div>
                    <Title level="3" weight="3">Критики</Title>
                    <Title level="1" style={{
                        marginTop: 10,
                        color: getColorByPercentage(filmCritics / 10)
                    }}>
                        {Math.floor(filmCritics * 10) / 10}
                    </Title>
                </Div>
            }

            {
                <Div>
                    <Title level="3" weight="3">В России</Title>
                    <Title level="1" style={{
                        marginTop: 10,
                        color: getColorByPercentage(russianFilmCritics / 100)
                    }}>
                        {Math.floor(russianFilmCritics * 10) / 10}
                    </Title>
                </Div>
            }
        </Flex>
    </Group>
}