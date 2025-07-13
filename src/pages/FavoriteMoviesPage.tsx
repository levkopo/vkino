import {observer} from "mobx-react-lite";
import {
    Group,
    PanelHeader,
    SplitCol,
} from "@vkontakte/vkui";
import {MoviesView} from "../components";
import {useStore} from "../stores";

export const FavoriteMoviesPage = observer(() => {
    const { movieFavoriteStore } = useStore()

    return <SplitCol width="100%" maxWidth="1200px" stretchedOnMobile autoSpaced>
        <PanelHeader>
            Избранные фильмы
        </PanelHeader>

        <Group>
            <MoviesView ids={movieFavoriteStore.favoriteMovieIds}/>
        </Group>
    </SplitCol>
})