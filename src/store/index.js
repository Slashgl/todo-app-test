import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({

});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// Используется для debug, удалить при окончании разработки
window.storage = store;

export default store;