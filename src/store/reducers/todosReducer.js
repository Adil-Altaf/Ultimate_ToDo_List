
import { FETCH_TODOS, FETCH_ERROR, DELETE_TODO } from '../actions/types'
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
        default:
            return state;
    }
}

export default TodosReducer;