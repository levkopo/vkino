import {Route, Routes, useNavigate} from "react-router";
import {MoviesPage, MoviePage, FavoriteMoviesPage} from "./pages";
import {
    AppRoot,
    Flex,
    Group,
    PanelHeader,
    SimpleCell,
    SplitCol,
    SplitLayout,
    Tabbar,
    TabbarItem,
    useAdaptivityConditionalRender,
    usePlatform
} from "@vkontakte/vkui";
import {Icon28HomeOutline, Icon28LogoVkColor, Icon28Favorite} from "@vkontakte/icons";
import "./App.css"

const pages = [
    {
        path: '/',
        icon: <Icon28HomeOutline/>,
        title: 'Главная'
    },
    {
        path: '/favorites',
        icon: <Icon28Favorite/>,
        title: 'Избранное'
    }
]

function App() {
    const navigate = useNavigate()
    const platform = usePlatform()
    const isVKCOM = platform === 'vkcom'
    const {viewWidth} = useAdaptivityConditionalRender()

    console.log(viewWidth.tabletMinus)
    return <AppRoot>
        <Flex direction="column">
            <div className="App-content">
                <SplitLayout center header={!isVKCOM && <PanelHeader delimiter="none"/>}>
                    {viewWidth.tabletPlus &&
                        <SplitCol fixed width={280} maxWidth={280} className={viewWidth.tabletPlus.className}>
                            <PanelHeader>
                                <Flex align="center" gap="s">
                                    <Icon28LogoVkColor/> вкино
                                </Flex>
                            </PanelHeader>

                            <Group>
                                {pages.map(it => <SimpleCell
                                    before={it.icon}
                                    key={it.path}
                                    onClick={() => navigate(it.path)}
                                >{it.title}</SimpleCell>)}
                            </Group>
                        </SplitCol>}

                    <Routes>
                        <Route path="/" element={<MoviesPage/>}/>
                        <Route path="/favorites" element={<FavoriteMoviesPage/>}/>
                        <Route path="/movie/:movieId" element={<MoviePage/>}/>
                    </Routes>


                </SplitLayout>
            </div>

            {viewWidth.tabletMinus && <Tabbar className={viewWidth.tabletMinus.className} style={{
                zIndex: 1000
            }}>
                {pages.map(it => <TabbarItem
                    title={it.title}
                    key={it.path}
                    aria-label={it.title}
                    onClick={() => navigate(it.path)}
                >{it.icon}</TabbarItem>)}
            </Tabbar>}
        </Flex>
    </AppRoot>
}

export default App
