import {observer} from "mobx-react-lite";
import {
    Group,
    PanelHeader,
    SplitCol,
    SplitLayout,
    usePlatform
} from "@vkontakte/vkui";
import {MoviesView} from "../components/MoviesView.tsx";
import {useStore} from "../stores/StoreContext.tsx";

export const FavoriteMoviesPage = observer(() => {
    const { movieFavoriteStore } = useStore()
    const platform = usePlatform();

    const isVKCOM = platform === 'vkcom';

    return <SplitLayout center header={!isVKCOM && <PanelHeader delimiter="none"/>}>
        <SplitCol width="100%" maxWidth="1200px" stretchedOnMobile autoSpaced>
            <PanelHeader>
                Избранные фильмы
            </PanelHeader>

            <Group>
                <MoviesView ids={movieFavoriteStore.favoriteMovieIds}/>
            </Group>
        </SplitCol>
    </SplitLayout>
})