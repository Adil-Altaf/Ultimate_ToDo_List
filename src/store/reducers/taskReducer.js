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
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(
          task =>
            task._id === action.payload._id
              ? {
                  ...task,
                  title: action.payload.title,
                  description: action.payload.description
                }
              : task
        )
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== action.payload)
      };
    case DONE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(
          task =>
            task._id === action.payload ? { ...task, done: !task.done } : task
        )
      };
    default:
      return state;
  }
};

export default TaskReducer;
