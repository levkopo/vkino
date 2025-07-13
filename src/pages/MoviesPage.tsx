import {observer} from "mobx-react-lite";
import {
    Group,
    PanelHeader,
    SplitCol,
} from "@vkontakte/vkui";
import {MoviesView} from "../components";

export const MoviesPage = observer(() => {
    return <SplitCol width="100%" maxWidth="1200px" stretchedOnMobile autoSpaced>
        <PanelHeader>
            Каталок фильмов
        </PanelHeader>

        <Group>
            <MoviesView/>
        </Group>
    </SplitCol>
})