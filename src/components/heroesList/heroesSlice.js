import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    heroes: [],
    heroesLoadingStatus: "idle",
};

export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", async () => {
    const { request } = useHttp();
    return await request("http://localhost:3001/heroes");
});

const heroesSlice = createSlice({
    name: "heroes",
    initialState,
    reducers: {
        // Генерируем action creators и те действия которые под них подвязываются
        // Внутри работает библиотека immerJs которая позволяет напрямую мутировать объекты
        heroCreated: (state, action) => {
            state.heroes.push(action.payload);
        },
        heroDeleted: (state, action) => {
            state.heroes = state.heroes.filter((item) => item.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, (state) => {
                state.heroesLoadingStatus = "loading";
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = "idle";
                state.heroes = action.payload;
            })
            .addCase(fetchHeroes.rejected, (state) => {
                state.heroesLoadingStatus = "error";
            })
            .addDefaultCase(() => {});
    },
});

const { actions, reducer } = heroesSlice;

export default reducer;
export const { heroCreated, heroDeleted } =
    actions;
