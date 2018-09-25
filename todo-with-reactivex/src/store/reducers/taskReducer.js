import {
    GET_TASKS,
    ADD_TASK,
    UPDATE_TASK,
    DELETE_TASK,
    GET_TASKS_SUCCESS,
    ADD_TASK_SUCCESS,
    UPDATE_TASK_SUCCESS,
    DELETE_TASK_SUCCESS,
    GET_ERROR,
    DONE_TASK,
    DONE_TASK_SUCCESS
} from '../actions/actionTypes';

const INITIAL_STATE = {
    tasks: [],
    task: null,
    updatedTask: null,
    deleteTaskId: null,
    doneTask : null,
    isLoading: false,
    error: null
};

const TaskReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                isLoading: true
            }
        case GET_TASKS_SUCCESS:
            return {
                ...state,
                tasks: action.payload,
                isLoading: false
            }
        case ADD_TASK:
            return {
                ...state,
                task: action.payload,
                isLoading: true
            }
        case ADD_TASK_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case UPDATE_TASK:
            return {
                ...state,
                updatedTask: action.payload,
                isLoading: true
            }

        case UPDATE_TASK_SUCCESS:
            return {
                ...state,
                tasks : state.tasks.map(task => {
                    return task.id === action.payload.id ? {...action.payload} : task
                }),
                isLoading: false
            }
        case DELETE_TASK:
            return {
                ...state,
                deleteTaskId: action.payload,
                isLoading: true
            }
        case DELETE_TASK_SUCCESS:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== state.deleteTaskId),
                isLoading: false
            }
        case DONE_TASK: 
            return{
                ...state,
                isLoading : true,
                doneTask : action.payload
            }
        case DONE_TASK_SUCCESS:
            return{
                ...state,
                tasks : state.tasks.map(task => {
                    return task.id === action.payload.id ? {...action.payload} : task
                }),
                isLoading : false
            }
        case GET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
};

export default TaskReducer;