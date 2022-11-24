import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import {todosReducer} from "./reducers/setTodo";

const rootReducer = combineReducers({
    todosReducer
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// Используется для debug, удалить при окончании разработки
window.storage = store;

export default store;