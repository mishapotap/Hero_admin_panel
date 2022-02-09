import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: [],
    filtersLoadingStatus: "idle",
    activeFilter: "all",
};

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        // Генерируем action creators и те действия которые под них подвязываются
        // Внутри работает библиотека immerJs которая позволяет напрямую мутировать объекты
        filtersFetching: (state) => {
            state.filtersLoadingStatus = "loading";
        },
        filtersFetched: (state, action) => {
            state.filtersLoadingStatus = "idle";
            state.filters = action.payload;
        },
        filtersFetchingError: (state) => {
            state.filtersLoadingStatus = "error";
        },
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload;
        },
    },
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const { filtersFetching, filtersFetched, filtersFetchingError, activeFilterChanged } =
    actions;
