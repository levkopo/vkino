import {observer} from "mobx-react-lite";
import {useStore} from "../stores/StoreContext.tsx";
import {type GridListProps, VirtuosoGrid} from "react-virtuoso";
import {MovieItem} from "./MovieItem.tsx";
import {Button, Div, PanelSpinner, Placeholder, SimpleGrid} from "@vkontakte/vkui";
import {forwardRef} from "react";
import {Icon56ErrorOutline} from "@vkontakte/icons";

export const MovieGridList = observer(() => {
    const {movieStore} = useStore()

    const totalItemCount = movieStore.hasMoreMovies
        ? movieStore.movies.length + 1
        : movieStore.movies.length;

    if (movieStore.isLoadingMovies) {
        return <PanelSpinner/>
    }

    return <Div>
        {movieStore.moviesError && <Placeholder
            icon={<Icon56ErrorOutline/>}
            title="Произошла ошибка загрузки"
            action={
                <Button onClick={() => {
                    movieStore.fetchMovies(false);
                }}>
                    Повторить попытку
                </Button>
            }
        />}

        <VirtuosoGrid
            data={movieStore.movies}
            totalCount={totalItemCount}
            useWindowScroll
            endReached={() => {
                console.log("Load")
                if (movieStore.hasMoreMovies && !movieStore.isLoadingMovies) {
                    movieStore.loadNextPage();
                }
            }}
            components={{
                List: forwardRef(({style, children, ...props}: GridListProps, ref) => (
                    <SimpleGrid
                        ref={ref}
                        {...props}
                        minColWidth={175} gap="m"
                        style={{
                            ...style,
                        }}
                    >
                        {children}
                    </SimpleGrid>
                )),
            }}
            initialItemCount={50}
            itemContent={(num, movie) => (
                <MovieItem key={movie?.id || `placeholder${num}`} movie={movie}/>
            )}
        />
    </Div>
})