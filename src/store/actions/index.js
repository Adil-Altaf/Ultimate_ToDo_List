import {
  FETCH_TODOS,
  DELETE_TODO,
  ADD_TODO,
  DONE_TODO,
  UPDATE_TODO,
  ERROR
} from "./types";
import { db } from "../config/firebaseconfig";

export const fetchTodos = () => {
  const arr = [];
  return async dispatch => {
    try {
      const querySnapshot = await db
        .collection("todos")
        .orderBy("timestamp", "desc")
        .get();
      querySnapshot.forEach(doc => {
        arr.push({
          id: doc.id,
          timestamp: doc.data().timestamp,
          title: doc.data().title,
          description: doc.data().description,
          done: doc.data().done
        });
      });
      dispatch({
        type: FETCH_TODOS,
        payload: arr
      });
    } catch (err) {
      if (err.response.status === 500) {
        dispatch({
          type: ERROR,
          payload: 'Connection failed'
        });
      }

    }
  };
};

export const updateTodo = (todoId, title, description) => {
  return async dispatch => {
    try {
      await db
        .collection("todos")
        .doc(todoId)
        .update({ title, description });
      dispatch({
        type: UPDATE_TODO,
        payload: {
          id: todoId,
          title: title,
          description: description
        }
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.message
      });
    }
  };
};

export const doneTodo = (todoId, todoDone) => {
  return async dispatch => {
    try {
      await db
        .collection("todos")
        .doc(todoId)
        .update({ done: !todoDone });
      dispatch({
        type: DONE_TODO,
        payload: todoId
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.message
      });
    }
  };
};

export const deleteTodo = todoId => {
  return async dispatch => {
    try {
      await db
        .collection("todos")
        .doc(todoId)
        .delete();
      dispatch({
        type: DELETE_TODO,
        payload: todoId
      });
      console.log("Document deleted");
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.message
      });
    }
  };
};

export const postTodo = (title, description) => {
  const todo = {
    title,
    description,
    done: false,
    timestamp: Date.now()
  };
  return async dispatch => {
    try {
      const docRef = await db.collection("todos").add(todo);
      console.log("Document written with ID: ", docRef.id);
      dispatch({
        type: ADD_TODO,
        todo
      })
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.message
      });
    }
  };
};
