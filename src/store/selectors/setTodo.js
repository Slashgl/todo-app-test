import { useSelector } from "react-redux";

export const GetTodos = () => useSelector((state) => state.todosReducer.todos);
