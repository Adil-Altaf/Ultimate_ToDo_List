import {
  GET_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  DONE_TASK
} from "../actions/actionTypes";
const INITIAL_STATE = {
  tasks: [],
  loader: false,
  snack: ""
};

const TaskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: state.tasks.push(action.payload)
      }  
    case UPDATE_TASK:
    console.log('update redu,', action.payload)
    console.log('Update Tasks ', state.tasks);
      return {
        ...state,
        tasks: state.tasks.map(
          task =>
            task.id === action.payload.id
              ? {
                  ...task,
                  todotitle: action.payload.todoTitle,
                  tododescription: action.payload.todoDescription
                }
              : task
        )
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case DONE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(
          task =>
            task.id === action.payload ? { ...task, complete: !task.complete } : task
        )
      };
    default:
      return state;
  }
};

export default TaskReducer;
