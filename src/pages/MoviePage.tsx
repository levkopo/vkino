import {observer} from "mobx-react-lite";
import {Navigate, useNavigate, useParams} from "react-router";
import {useStore} from "../stores/StoreContext.tsx";
import {useEffect} from "react";
import {
    PanelHeader, PanelHeaderBack, SplitCol, SplitLayout, usePlatform,
} from "@vkontakte/vkui";
import {MovieRating} from "../components/MovieRating.tsx";
import {MovieDetails} from "../components/MovieDetails.tsx";

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
    const isVKCOM = platform === 'vkcom';

    return <SplitLayout center header={!isVKCOM && <PanelHeader delimiter="none" />}>
        <SplitCol width="100%" maxWidth="720px" stretchedOnMobile autoSpaced>
            <PanelHeader
                before={
                    <PanelHeaderBack
                        onClick={() => navigate("/")}
                        label={platform === 'vkcom' ? 'Назад' : undefined}
                    />
                }
            >Фильм</PanelHeader>

            {
                movie && <>
                    <MovieDetails movie={movie}/>
                    <MovieRating rating={movie.rating}/>
                </>
            }
        </SplitCol>

    </SplitLayout>
})

