const initialState = {
    heroes: [],
    heroesLoadingStatus: "idle",
    filters: [],
    filtersLoadingStatus: "idle",
    activeFilter: "all",
    filteredHeroes: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "HEROES_FETCHING":
            return {
                ...state,
                heroesLoadingStatus: "loading",
            };
        case "HEROES_FETCHED": //heroes
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: "idle",
                filteredHeroes:
                    state.activeFilter === "all"
                        ? action.payload
                        : action.payload.filter((item) => item.element === state.activeFilter),
            };
        case "HEROES_FETCHING_ERROR":
            return {
                ...state,
                heroesLoadingStatus: "error",
            };
        case "FILTERS_FETCHING":
            return {
                ...state,
                filtersLoadingStatus: "loading",
            };
        case "FILTERS_FETCHED": //filters
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: "idle",
            };
        case "FILTERS_FETCHING_ERROR":
            return {
                ...state,
                filtersLoadingStatus: "error",
            };
        case "ACTIVE_FILTER_CHANGED": //filter
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes:
                    action.payload === "all"
                        ? state.heroes
                        : state.heroes.filter((item) => item.element === action.payload),
            }; // Фильтруем героев по их элементу
        case "HERO_DELETED": //id
            const newHeroList = state.heroes.filter((item) => item.id !== action.payload);
            return {
                ...state,
                heroes: newHeroList,
                filteredHeroes:
                    state.activeFilter === "all"
                        ? newHeroList
                        : newHeroList.filter((item) => item.element === state.activeFilter),
            };
        // Сформировали новый массив и отфильтровали новые данные по фильтру который щас применяется
        case "HERO_CREATED": //hero
            const newHeroListCreated = [...state.heroes, action.payload];
            return {
                ...state,
                heroes: newHeroListCreated,
                filteredHeroes:
                    state.activeFilter === "all"
                        ? newHeroListCreated
                        : newHeroListCreated.filter((item) => item.element === state.activeFilter),
            };
        // Сформировали новый массив и отфильтровали новые данные по фильтру который щас применяется
        default:
            return state;
    }
};

export default reducer;
