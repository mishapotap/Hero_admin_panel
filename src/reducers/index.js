const initialState = {
    heroes: [],
    heroesLoadingStatus: "idle",
    filters: [],
    filtersLoadingStatus: "idle",
    activeFilter: "all",
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
            };
        case "HERO_DELETED": //id
            return {
                ...state,
                heroes: state.heroes.filter((item) => item.id !== action.payload),
            };
        case "HERO_CREATED": //hero
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
            };
        default:
            return state;
    }
};

export default reducer;
