
import { FETCH_TODOS, FETCH_ERROR } from '../actions/types'
const INITIAL_STATE = {
    todos: null
}

const TodosReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_TODOS:
            return {
                ...state, todos: action.payload
            }    
        default:
            return state;
    }
}

export default TodosReducer;