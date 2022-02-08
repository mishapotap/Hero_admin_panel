import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import heroes from "../reducers/heroes";
import filters from "../reducers/filters";

const stringMiddleware = (store) => (dispatch) => (action) => {
    if (typeof action === "string") {
        return dispatch({
            type: action,
        });
    }
    return dispatch(action);
};

// const enchancer =
//     (createStore) =>
//     (...args) => {
//         const store = createStore(...args);

//         const oldDispatch = store.dispatch;
//         store.dispatch = (action) => {
//             if (typeof action === "string") {
//                 return oldDispatch({
//                     type: action,
//                 });
//             }
//             return oldDispatch(action);
//         };
//         return store;
//     }; // store enchancer (Усилитель стора)

const store = createStore(
    combineReducers({ heroes, filters }),
    compose(
        applyMiddleware(stringMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
); // Сократили {heroes: heroes, filters: filters}

export default store;