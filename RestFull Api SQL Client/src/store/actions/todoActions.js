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
      dispatch({
        type: GET_TASKS,
        payload: response.data
      });
    } catch (err) {
      dispatch({
        type: GET_ERROR,
        payload: err.message
      });
    }
  };
};

export const addTask = task => {
  return async dispatch => {
    try {
          await axios.post(`${BASE_URL}todo/api/v1.0/tasks/`, {
          todoTitle: task.title,
          todoDescription: task.description
      });
    } catch (err) {
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
          id: task.id,
          todoTitle: task.title || task.todoTitle  ,
          todoDescription: task.description || task.todoDescription
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