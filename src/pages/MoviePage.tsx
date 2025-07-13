import {observer} from "mobx-react-lite";
import {Navigate, useNavigate, useParams} from "react-router";
import {useStore} from "../stores";
import {useEffect} from "react";
import {
    Group,
    PanelHeader, PanelHeaderBack, SplitCol, usePlatform,
} from "@vkontakte/vkui";
import {MovieRating, MovieDetails} from "../components";

export const MoviePage = observer(() => {
    const {movieId} = useParams<{ movieId: string }>()
    const {movieStore} = useStore()
    const navigate = useNavigate()
    const platform = usePlatform();

    useEffect(() => {
        if (movieId) {
            movieStore.fetchMovieById(parseInt(movieId))
        }
    }, [movieId, movieStore]);

    if (!movieId) {
        return <Navigate to="/"/>
    }

    const movie = movieStore.movieById(parseInt(movieId!))

    return <SplitCol width="100%" maxWidth="720px" stretchedOnMobile autoSpaced>
        <PanelHeader
            before={
                <PanelHeaderBack
                    onClick={() => navigate(-1)}
                    label={platform === 'vkcom' ? 'Назад' : undefined}
                />
            }
        >Фильм</PanelHeader>

        {
            movie && <>
                <Group>
                    <MovieDetails movie={movie}/>
                </Group>

                <Group>
                    <MovieRating rating={movie.rating}/>
                </Group>
            </>
        }
    </SplitCol>
})

