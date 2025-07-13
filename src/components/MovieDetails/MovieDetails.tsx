import type {Movie} from "../../models";
import {
    Button, ButtonGroup,
    Chip,
    Div,
    Flex,
    Header, ModalCard, ModalRoot, Spacing,
    Subhead,
    Text,
    Title
} from "@vkontakte/vkui";
import {MoviePoster} from "../MoviePoster/MoviePoster.tsx";
import {observer} from "mobx-react-lite";
import {useStore} from "../../stores";
import {Icon12Add, Icon12Delete, Icon56AddCircleOutline} from "@vkontakte/icons";
import {useState} from "react";
import "./MovieDetails.css"

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

    return <>
        <Div className="MovieDetails">
            <Flex align="center" direction="column" className="MovieDetails--header">
                <MoviePoster
                    movie={movie}
                    className="MovieDetails--header-poster"
                />

                <Title className="MovieDetails--header-name">{name}</Title>
                <Subhead className="MovieDetails--header-year">{year}</Subhead>

                <Button
                    className="MovieDetails--header-favorite"
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
            <Text>{description}</Text>
        </Div>

        <Flex margin="auto" gap="m">
            {genres.map(it => <Chip
                key={`genre-${it.name}`}
                removable={false}
            >{it.name}</Chip>)}
        </Flex>

        {modal}
    </>
})