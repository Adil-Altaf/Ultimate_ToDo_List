import { combineReducers } from "redux";
import TodosReducers from "./todosReducer";

const rootReducer = combineReducers({
  todos: TodosReducers
});

export default rootReducer;
