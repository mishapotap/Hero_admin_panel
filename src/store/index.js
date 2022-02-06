import { createStore, combineReducers, compose } from "redux";
import heroes from "../reducers/heroes";
import filters from "../reducers/filters";

const enchancer =
    (createStore) =>
    (...args) => {
        const store = createStore(...args);

        const oldDispatch = store.dispatch;
        store.dispatch = (action) => {
            if (typeof action === "string") {
                return oldDispatch({
                    type: action,
                });
            }
            return oldDispatch(action);
        };
        return store;
    }; // store enchancer (Усилитель стора)

const store = createStore(
    combineReducers({ heroes, filters }),
    compose(enchancer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
); // Сократили {heroes: heroes, filters: filters}

export default store;
