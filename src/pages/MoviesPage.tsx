import {observer} from "mobx-react-lite";
import {MovieItem} from "../components/MovieItem.tsx";
import {useSearchParams} from 'react-router-dom';
import {
    Div,
    Group,
    PanelHeader, SimpleGrid,
    SplitCol,
    SplitLayout,
    usePlatform
} from "@vkontakte/vkui";
import {useStore} from "../stores/StoreContext.tsx";
import {VirtuosoGrid} from "react-virtuoso";
import {useEffect} from "react";
import {MovieFilters} from "../components/MovieFilters.tsx";

export const MoviesPage = observer(() => {
    const {movieStore} = useStore()
    const platform = usePlatform();
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

        if (movieStore.movies.length === 0 && !movieStore.isLoadingMovies) {
            movieStore.fetchMovies(false);
        }

    }, [searchParams, movieStore]);

    const isVKCOM = platform === 'vkcom';

    const totalItemCount = movieStore.hasMoreMovies
        ? movieStore.movies.length + 1
        : movieStore.movies.length;

    return <SplitLayout center header={!isVKCOM && <PanelHeader delimiter="none"/>}>
        <SplitCol width="100%" maxWidth="1200px" stretchedOnMobile autoSpaced>
            <PanelHeader>
                Каталок фильмов
            </PanelHeader>

            <Group>
                <MovieFilters/>

                <Div>
                    <VirtuosoGrid
                        data={movieStore.movies}
                        totalCount={totalItemCount}
                        endReached={() => {
                            console.log("Load")
                            if (movieStore.hasMoreMovies && !movieStore.isLoadingMovies) {
                                movieStore.loadNextPage();
                            }
                        }}
                        components={{
                            // You'd define custom components to wrap your items to handle grid layout
                            // It's more involved than a simple map but crucial for virtualization.
                            // Example: Item: (props) => <div className="grid-item-wrapper" {...props} />
                            // and List: (props) => <div className="movie-grid" {...props} />
                        }}
                        // itemContent is how each item is rendered
                        itemContent={(_, movie) => (
                            <MovieItem key={movie.id} movie={movie}/>
                        )}
                    />

                    <SimpleGrid minColWidth={175} gap="m">
                        {
                            movieStore.movies.map(
                                movie =>
                                    <MovieItem movie={movie}/>
                            )
                        }
                    </SimpleGrid>
                </Div>
            </Group>
        </SplitCol>
    </SplitLayout>
})