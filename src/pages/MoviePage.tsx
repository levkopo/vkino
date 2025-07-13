import {observer} from "mobx-react-lite";
import {Navigate, useParams} from "react-router";
import {useStore} from "../stores/StoreContext.tsx";
import {useEffect} from "react";

export const MoviePage = observer(() => {
    const { movieId } = useParams<{ movieId: string }>()
    const { movieStore } = useStore()

    useEffect(() => {
        if(movieId) {
            movieStore.fetchMovieById(parseInt(movieId))
        }
    }, [movieId, movieStore]);

    if(!movieId) {
        return <Navigate to="/"/>
    }

    const movie = movieStore.movieById(parseInt(movieId!))

    return movie && <div>
        <img src={movie.poster.url} alt={movie.name}/>
        <h1>{movie.name}</h1>
        <h4>{movie.year}</h4>
        <p>{movie.description}</p>
        <div>
            {movie.genres.map(it => <div key={`genre-${it.name}`}>{it.name}</div>)}
        </div>

        {
            movie.rating.kp !== 0 && <div>
                Рейтинг кинопоиска: {movie.rating.kp}
            </div>
        }

        {
            movie.rating.imdb !== 0 && <div>
                Рейтинг Imdb: {movie.rating.imdb}
            </div>
        }

        {
            movie.rating.russianFilmCritics !== 0 && <div>
                Рейтинг российских критиков: {movie.rating.russianFilmCritics}
            </div>
        }

        {
            movie.rating.filmCritics !== 0 && <div>
                Рейтинг критиков: {movie.rating.filmCritics}
            </div>
        }
    </div>
})