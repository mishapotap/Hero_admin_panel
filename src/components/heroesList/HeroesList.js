import { useHttp } from "../../hooks/http.hook";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleted } from "../../actions";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const filteredHeroesSelector = createSelector(
        (state) => state.filters.activeFilter,
        (state) => state.heroes.heroes,
        (filter, heroes) => {
            if (filter === "all") {
                console.log("render");
                return heroes;
            } else {
                console.log("render");
                return heroes.filter((item) => item.element === filter);
            }
        }
    ); // Используется библиотека reselect (если функция видит что значение не изменилось то она не будет вызываться просто так)
    // Альтернативный вариант - ниже

    // const filteredHeroes = useSelector((state) => {
    //     if (state.filters.activeFilter === "all") {
    //         return state.heroes.heroes;
    //     } else {
    //         return state.heroes.heroes.filter(
    //             (item) => item.element === state.filters.activeFilter
    //         );
    //     }
    // }); //Если element у героя совпадает с активным фильтром то он попадает в массив filteredHeroes
    const filteredHeroes = useSelector(filteredHeroesSelector);
    const heroesLoadingStatus = useSelector((state) => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then((data) => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()));

        // eslint-disable-next-line
    }, []);

    const onDelete = useCallback(
        (id) => {
            request(`http://localhost:3001/heroes/${id}`, "DELETE")
                .then((data) => console.log(data, "Deleted"))
                .then(dispatch(heroDeleted(id)))
                .catch((error) => console.log(error));
        },
        //data-удаленный персонаж с его данными
        // eslint-disable-next-line
        [request]
    );

    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>;
        }

        return arr.map(({ id, ...props }) => {
            return <HeroesListItem onDelete={() => onDelete(id)} key={id} {...props} />;
        });
    };

    const elements = renderHeroesList(filteredHeroes);
    return <ul>{elements}</ul>;
};

export default HeroesList;
