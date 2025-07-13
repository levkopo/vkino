import {observer} from "mobx-react-lite";
import {useStore} from "../../stores";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {MovieFilters} from "../MovieFilters/MovieFilters.tsx";
import {MovieGridList} from "../MovieGridList/MovieGridList.tsx";
import {areArraysEqualAnyOrder} from "../../utils";
export interface MoviesViewProps {
    ids?: number[] | undefined
}

export const MoviesView = observer((props: MoviesViewProps) => {
    const { ids } = props
    const [isInitialized, setIsInitialized] = useState(false)
    const {movieStore} = useStore()
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const genresParam = searchParams.get('genres');
        const minRatingParam = searchParams.get('minRating');
        const maxRatingParam = searchParams.get('maxRating');
        const minYearParam = searchParams.get('minYear');
        const maxYearParam = searchParams.get('maxYear');

        const newSelectedGenres = genresParam ? genresParam.split(',') : [];
        const newMinRating = minRatingParam ? Number(minRatingParam) : 0;
        const newMaxRating = maxRatingParam ? Number(maxRatingParam) : 10;
        const newMinYear = minYearParam ? Number(minYearParam) : 1990;
        const newMaxYear = maxYearParam ? Number(maxYearParam) : new Date().getFullYear();

        if (JSON.stringify(movieStore.genres) !== JSON.stringify(newSelectedGenres)) {
            movieStore.setGenreFilter(newSelectedGenres);
        }

        if (movieStore.minRating !== newMinRating || movieStore.maxRating !== newMaxRating) {
            movieStore.setRatingRange(newMinRating, newMaxRating);
        }

        if (movieStore.minYear !== newMinYear || movieStore.maxYear !== newMaxYear) {
            movieStore.setYearRange(newMinYear, newMaxYear);
        }

        console.log(movieStore.ids, ids)
        if ((movieStore.movies.length === 0 && !movieStore.isLoadingMovies) || !areArraysEqualAnyOrder(movieStore.ids, ids)) {
            if(!areArraysEqualAnyOrder(movieStore.ids, ids)) {
                movieStore.resetAllFilters();
                movieStore.resetMovieList();
            }

            movieStore.setIds(ids);
            movieStore.fetchMovies(false);
        }


        setIsInitialized(true)
    }, [ids, searchParams, movieStore]);

    return <>
        <MovieFilters/>
        {isInitialized && <MovieGridList/>}
    </>
})