import {
  GET_TASKS,
  GET_ERROR,
  UPDATE_TASK,
  DELETE_TASK,
  DONE_TASK
} from "./actionTypes";
import axios from "axios";
const BASE_URL = "https://team-alpha-todo.herokuapp.com/";

export const getTasks = () => {
  return async dispatch => {
    try {
      const response = await axios.get(`${BASE_URL}todo/api/v1.0/tasks/`);
      console.log("Response data: ", response.data);
      dispatch({
        type: GET_TASKS,
        payload: response.data
      });
    } catch (err) {
      console.log('Error: ', err.message);
      dispatch({
        type: GET_ERROR,
        payload: err.message
      });
    }
  };
};

export const addTask = task => {
  console.log('Task add: ', task)
  return async dispatch => {
    try {
      const response = await axios.post(`${BASE_URL}todo/api/v1.0/tasks/`, {
          todoTitle: task.title,
          todoDescription: task.description
      });
      console.log('ADD TASK: ', response.data)
    } catch (err) {
      console.log('Add error: ', err.message)
      dispatch({
        type: GET_ERROR,
        payload: err.message
      });
    }
  };
};

export const deleteTask = id => {
  return async dispatch => {
    try {
          await axios.delete(
        `${BASE_URL}todo/api/v1.0/tasks/${id}`
      );
      dispatch({
        type: DELETE_TASK,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: DELETE_TASK,
        payload: err.message
      });
    }
  };
};

export const updateTask = (task) => {
    console.log('Task', task);
  return async dispatch => {
    try {
       await axios.put(`${BASE_URL}todo/api/v1.0/tasks/${task.id}`, {
        todoTitle: task.title,
        todoDescription: task.description,
        complete: false
      });
      dispatch({
        type: UPDATE_TASK,
        payload: {
          id: task.id ,
          todoTitle: task.title,
          todoDescription: task.description
        }
      });
    } catch (error) {
      dispatch({
        type: GET_ERROR,
        payload: error.message
      });
    }
  };
};

export const doneTodo = (task) => {
  // console.log('Complete: ', complete);
    return async dispatch => {
        try {
            await axios.put(`${BASE_URL}todo/api/v1.0/tasks/${task.id}`, {
               todoTitle: task.title,
               todoDescription: task.description,
               complete: !task.complete
            })
            dispatch({
                type: DONE_TASK,
                payload: task.id
            })
        }
        catch(err) {
            dispatch({
                type: GET_ERROR,
                payload: err.message
            })
        }
    }
}