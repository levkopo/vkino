import {observer} from "mobx-react-lite";
import {MovieItem} from "../components/MovieItem.tsx";
import {mockMovie} from "../mock.ts";

export const MoviesPage = observer(() => {
    return <div style={{
        display: "flex",
        flexWrap: 'wrap',
        gap: 8,
        maxWidth: 1200,
        marginLeft: 'auto',
        marginRight: 'auto'
    }}>
        <MovieItem movie={mockMovie}/>
        <MovieItem movie={mockMovie}/>
        <MovieItem movie={mockMovie}/>
        <MovieItem movie={mockMovie}/>
        <MovieItem movie={mockMovie}/>
        <MovieItem movie={mockMovie}/>
        <MovieItem movie={mockMovie}/>
        <MovieItem movie={mockMovie}/>
        <MovieItem movie={mockMovie}/>
        <MovieItem movie={mockMovie}/>
        <MovieItem movie={mockMovie}/>
        <MovieItem movie={mockMovie}/>
        <MovieItem movie={mockMovie}/>
        <MovieItem movie={mockMovie}/>
        <MovieItem movie={mockMovie}/>
        <MovieItem movie={mockMovie}/>
        <MovieItem movie={mockMovie}/>
        <MovieItem movie={mockMovie}/>
    </div>
})