import {setTodo, SET_TODO} from "../actions/setTodo";

const initialState  = {
    todos: null,
    idDeletedTodo: null,
}

const setTodos = (data) => (dispatch) => {
    dispatch(setTodo(data))
}

const todosReducer = (state = initialState , action) => {
    switch (action.type) {
        case SET_TODO:
            return {
                ...state,
                todos: action.payload
            }
        default:
            return state;
    }
}

export {todosReducer, setTodos}