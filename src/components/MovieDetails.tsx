import type {Movie} from "../models/Movie.ts";
import {Chip, Div, Flex, Group, Header, Subhead, Text, Title} from "@vkontakte/vkui";
import {MoviePoster} from "./MoviePoster.tsx";

export interface MovieDetailsProps {
    movie: Movie
}

export const MovieDetails = (props: MovieDetailsProps) => {
    const {
        movie: {
            poster,
            name,
            year,
            description,
            genres
        }
    } = props

    return <Group>
        <Div>
            <Flex align="center" direction="column">
                <MoviePoster
                    poster={poster}
                    style={{
                        height: "40vh",
                        border: 'var(--vkui--size_border--regular) solid var(--vkui--color_image_border_alpha)',
                    }}
                />

                <Title style={{
                    marginTop: 24,
                    maxWidth: 300,
                    textAlign: 'center'
                }}>{name}</Title>
                <Subhead style={{
                    marginTop: 6,
                    maxWidth: 300,
                }}>{year}</Subhead>
            </Flex>


        </Div>

        <Header>О фильме</Header>

        <Div>
            <Text style={{
                marginTop: 0
            }}>{description}</Text>
        </Div>

        <Flex margin="auto" gap="m">
            {genres.map(it => <Chip
                key={`genre-${it.name}`}
                removable={false}
            >{it.name}</Chip>)}
        </Flex>
    </Group>
}