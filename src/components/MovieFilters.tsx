import {observer} from "mobx-react-lite";
import {
    Button, ChipsInput,
    Counter, FormItem, FormLayoutGroup,
    ModalPage,
    ModalPageHeader,
    ModalRoot, PanelHeaderButton,
    PanelHeaderClose, Slider,
    SubnavigationBar,
    SubnavigationButton,
    usePlatform,
    VisuallyHidden
} from "@vkontakte/vkui";
import {Icon24Dismiss, Icon24Filter} from "@vkontakte/icons";
import {useStore} from "../stores/StoreContext.tsx";
import {useState} from "react";
import {useSearchParams} from "react-router-dom";

const MODAL_NAME = 'filters';

export const MovieFilters = observer(() => {
    const {movieStore} = useStore()
    const platform = usePlatform()
    const [searchParams, setSearchParams] = useSearchParams();

    const [filtersModalOpened, setFiltersModalOpened] = useState(false)

    const [generes, setGeneres] = useState<string[]>([])
    const [minRating, setMinRating] = useState<number | undefined>(undefined)
    const [maxRating, setMaxRating] = useState<number | undefined>(undefined)
    const [minYear, setMinYear] = useState<number | undefined>(undefined)
    const [maxYear, setMaxYear] = useState<number | undefined>(undefined)

    const openModal = () => {
        setFiltersModalOpened(true)
    };

    const closeModal = () => {
        setFiltersModalOpened(false)
    };

    const updateSearchParams = () => {
        searchParams.set('genres', movieStore.selectedGenres.join(','))
        searchParams.set('minRating', movieStore.minRating.toString())
        searchParams.set('maxRating', movieStore.maxRating.toString())
        searchParams.set('minYear', movieStore.minYear.toString())
        searchParams.set('maxYear', movieStore.maxYear.toString())
        setSearchParams(searchParams)
    }

    const selectGenre = (genre: string) => {
        movieStore.setGenreFilter([...movieStore.selectedGenres, genre])
        updateSearchParams()
    }

    const unselectGenre = (genre: string) => {
        movieStore.setGenreFilter(movieStore.selectedGenres.filter(it => it !== genre))
        updateSearchParams()
    }

    const applyFilters = () => {
        movieStore.setGenreFilter(generes)
        movieStore.setYearRange(minYear, maxYear)
        movieStore.setRatingRange(minRating, maxRating)
        updateSearchParams()
        closeModal()
    };

    const modal = (
        <ModalRoot activeModal={filtersModalOpened ? MODAL_NAME : null} onClose={closeModal}>
            <ModalPage
                id={MODAL_NAME}
                header={
                    <ModalPageHeader
                        before={platform !== 'ios' && <PanelHeaderClose onClick={closeModal}/>}
                        after={
                            platform === 'ios' && (
                                <PanelHeaderButton onClick={closeModal}>
                                    <Icon24Dismiss/>
                                </PanelHeaderButton>
                            )
                        }
                    >
                        Фильтры
                    </ModalPageHeader>
                }
            >
                <FormLayoutGroup>
                    <FormItem htmlFor="color" top="Фильтры">
                        <ChipsInput
                            id="color"
                            placeholder="Введите фильтры"
                            allowClearButton
                            defaultValue={movieStore.selectedGenres.map(it => ({
                                value: it,
                                label: it
                            }))}
                            onChange={(e) => {
                                setGeneres(e.map(it => it.value))
                            }}
                        />
                    </FormItem>

                    <FormItem top="Рейтинг">
                        <Slider
                            withTooltip
                            multiple
                            step={1}
                            min={0}
                            max={10}
                            defaultValue={[movieStore.minRating, movieStore.maxRating]}
                            onChange={(newValue) => {
                                setMinRating(newValue[0])
                                setMaxRating(newValue[1])
                            }}
                        />
                    </FormItem>


                    <FormItem top="Год выпуска">
                        <Slider
                            withTooltip
                            multiple
                            step={1}
                            min={1990}
                            max={new Date().getFullYear()}
                            defaultValue={[movieStore.minYear, movieStore.maxYear]}
                            onChange={(newValue) => {
                                setMinYear(newValue[0])
                                setMaxYear(newValue[1])
                            }}
                        />
                    </FormItem>

                    <FormItem>
                        <Button size="l" stretched onClick={applyFilters}>
                            Показать результаты
                        </Button>
                    </FormItem>
                </FormLayoutGroup>
            </ModalPage>
        </ModalRoot>
    );

    return <>
        <SubnavigationBar>
            <SubnavigationButton
                before={<Icon24Filter/>}
                selected={movieStore.filtersCount != 0}
                chevron
                onClick={openModal}
                after={
                    movieStore.filtersCount > 0 && (
                        <Counter size="s">
                            <VisuallyHidden>Применено: </VisuallyHidden>
                            {movieStore.filtersCount}
                        </Counter>
                    )
                }
            >
                Фильтры
            </SubnavigationButton>

            {
                movieStore.selectedGenres.map(genre => <SubnavigationButton
                    selected={true}
                    onClick={() => unselectGenre(genre)}
                >
                    {genre}
                </SubnavigationButton>)
            }

            {
                movieStore.genres
                    .filter(it => !movieStore.selectedGenres.includes(it))
                    .map(genre => <SubnavigationButton
                        selected={false}
                        onClick={() => selectGenre(genre)}
                    >
                        {genre}
                    </SubnavigationButton>)
            }
        </SubnavigationBar>

        {modal}
    </>

})