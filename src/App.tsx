import {Route, Routes} from "react-router";
import {MoviesPage, MoviePage} from "./pages";
import {AppRoot} from "@vkontakte/vkui";
import {FavoriteMoviesPage} from "./pages/FavoriteMoviesPage.tsx";

function App() {
    return (
        <AppRoot>
            <Routes>
                <Route path="/" element={<MoviesPage/>}/>
                <Route path="/favorites" element={<FavoriteMoviesPage/>}/>
                <Route path="/movie/:movieId" element={<MoviePage/>}/>
            </Routes>
        </AppRoot>
    )
}

export default App
