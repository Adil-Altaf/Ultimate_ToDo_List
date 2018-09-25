import {GET_TASKS , ADD_TASK , UPDATE_TASK , DELETE_TASK} from '../actions/actionTypes';
const INITIAL_STATE = {
    tasks : [],
    loader : false,
    snack : ''

}

const TaskReducer = (state = INITIAL_STATE , action) =>{
    switch(action.type){
        case GET_TASKS:
            return {
                ...state,
                tasks : action.payload
            }
        case ADD_TASK:
            return false
        case UPDATE_TASK:
            return true
        case DELETE_TASK:
            return true
        default:
            return state;
    }
};

export default  TaskReducer;