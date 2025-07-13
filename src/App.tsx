import {Route, Routes} from "react-router";
import {MoviesPage, MoviePage} from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MoviesPage/>}/>
      <Route path="/movie/:movieId" element={<MoviePage/>}/>
    </Routes>
  )
}

export default App
