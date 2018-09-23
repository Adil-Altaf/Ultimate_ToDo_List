import {
  GET_TASKS,
  GET_ERROR,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  DONE_TASK
} from "./actionTypes";
import axios from "axios";
const BASE_URL = "https://mongonosql.herokuapp.com/";

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
      const response = await axios.post(`${BASE_URL}todo/api/v1.0/tasks/`, {
          title: task.title,
          description: task.description,
          done: task.done
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
      const response = await axios.delete(
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
        title: task.title,
        description: task.description,
        done: task.done
      });
      dispatch({
        type: UPDATE_TASK,
        payload: {
          _id: task.id ,
          title: task.title,
          description: task.description
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

export const doneTodo = (todoId) => {
  console.log(todoId.id)
  return async dispatch => {
    try {
        await axios.put(`${BASE_URL}todo/api/v1.0/tasks/${todoId.id}`, {
           done: !todoId.done
        })
        dispatch({
            type: DONE_TASK,
            payload: todoId.id
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