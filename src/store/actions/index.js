import { FETCH_TODOS } from "./types";
import { db } from "../config/firebaseconfig";

export const fetchTodos = () => {
  const arr = [];
  return async dispatch => {
    try {
      await db
        .collection("todos")
        .orderBy("timestamp", "desc")
        .get()
        .then(querySnapshot => {
          // console.log('Data: ', querySnapshot);

          querySnapshot.forEach(doc => {
            // console.log(`${doc.id} => ${doc.data()}`);
            arr.push({
              id: doc.id,
              title: doc.data().title,
              description: doc.data().description,
              date: doc.data().date,
              done: doc.data().done
            });
          });
          console.log("Todos arr: ", arr);
          dispatch({
            type: FETCH_TODOS,
            payload: arr
          });
        });
    } catch (err) {
      alert(err.message);
    }
  };
};

export const updateTodo = (todoId, title, description) => {
  return async dispatch => {
    await db
      .collection("todos")
      .where("uid", "==", todoId)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
          // Build doc ref from doc.id
          db.collection("todos")
            .doc(doc.id)
            .update({
              title,
              description
            });
        });
      });
  };
};

export const deleteTodo = todoId => {
  return async dispatch => {
    try {
      await db
        .collection("todos")
        .doc(todoId)
        .delete();
      console.log("Document deleted");
    } catch (err) {
      console.error("Error removing document: ", error);
    }
  };
};

export const postTodo = (title, description) => {
  const date = new Date();
  const dateStr =
    date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
  const todo = {
    title,
    description,
    date: dateStr,
    done: false,
    timestamp: Date.now()
  };
  return async dispatch => {
    try {
      const docRef = await db
        .collection("todos")
        .add(todo)
      console.log("Document written with ID: ", docRef.id);
    }
    catch (err) {
      console.error("Error adding document: ", err);
    }
  }
}
