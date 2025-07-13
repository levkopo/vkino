import type {Movie} from "../models/Movie.ts";
import {
    Button, ButtonGroup,
    Chip,
    Div,
    Flex,
    Group,
    Header, ModalCard, ModalRoot, Spacing,
    Subhead,
    Text,
    Title
} from "@vkontakte/vkui";
import {MoviePoster} from "./MoviePoster.tsx";
import {observer} from "mobx-react-lite";
import {useStore} from "../stores/StoreContext.tsx";
import {Icon12Add, Icon12Delete, Icon56AddCircleOutline} from "@vkontakte/icons";
import {useState} from "react";

export interface MovieDetailsProps {
    movie: Movie
}

const MODAL_NAME = "add_to_favorite"

export const MovieDetails = observer((props: MovieDetailsProps) => {
    const {
        movie
    } = props

    const {
        name,
        year,
        description,
        genres
    } = movie

    const {movieFavoriteStore} = useStore()
    const [favoriteModalOpened, setFavoriteModalOpened] = useState(false)

    const isFavorite = movieFavoriteStore.isFavorite(movie.id)

    const openFavoriteModal = () => {
        setFavoriteModalOpened(true)
    };

    const closeFavoriteModal = () => {
        setFavoriteModalOpened(false)
    };

    const addToFavorites = () => {
        movieFavoriteStore.addFavorite(movie.id)
        closeFavoriteModal()
    }

    const modal = (
        <ModalRoot activeModal={favoriteModalOpened ? MODAL_NAME : null} onClose={closeFavoriteModal}>
            <ModalCard
                id={MODAL_NAME}
                onClose={closeFavoriteModal}
                icon={<Icon56AddCircleOutline/>}
                title="Вы уверены что хотите добавить фильм в избранное?"
                actions={
                    <>
                        <Spacing size={16} />
                        <ButtonGroup gap="m" stretched>
                            <Button
                                key="deny"
                                size="l"
                                mode="secondary"
                                stretched
                                onClick={closeFavoriteModal}
                            >
                                Отмена
                            </Button>
                            <Button
                                key="allow"
                                size="l"
                                mode="primary"
                                stretched
                                onClick={addToFavorites}
                            >
                                Добавить
                            </Button>
                        </ButtonGroup>
                    </>
                }
            />
        </ModalRoot>
    )

    return <Group>
        <Div>
            <Flex align="center" direction="column">
                <MoviePoster
                    movie={movie}
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

                <Button
                    style={{
                        marginTop: 24,
                    }}
                    before={isFavorite ? <Icon12Delete/> : <Icon12Add/>}
                    mode={isFavorite ? 'secondary' : 'primary'}
                    onClick={() => {
                        if (isFavorite) {
                            movieFavoriteStore.removeFavorite(movie.id)
                        } else {
                            openFavoriteModal()
                        }
                    }}
                >{
                    isFavorite ? 'Убрать из избранных' : 'Добавить в избранное'
                }</Button>
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

        {modal}
    </Group>
})