
import { FETCH_TODOS, FETCH_ERROR, DELETE_TODO, DONE_TODO } from '../actions/types'
const INITIAL_STATE = {
    todos: null
}

const TodosReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_TODOS:
            return {
                ...state, todos: action.payload
            }
        case DELETE_TODO:
            return {
                ...state, todos: state.todos.filter(todo => todo.id !== action.payload)
            }
        case DONE_TODO:
            return {
                ...state, todos: state.todos.map(todo => (todo.id === action.payload) ?
                    { ...todo, done: !todo.done } : todo)
            }
        default:
            return state;
    }
}

export default TodosReducer;