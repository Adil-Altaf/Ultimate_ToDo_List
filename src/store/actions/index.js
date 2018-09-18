import { FETCH_TODOS } from "./types";
import { db } from "../config/firebaseconfig";

export const fetchTodos = () => {
  const arr = [];
  return async dispatch => {
    try {
      await db
        .collection("todos")
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

export const deleteTodo = todoId => {
  return async dispatch => {
    await db
      .collection("todos")
      .doc(todoId)
      .delete()
      .then(function() {
        console.log("Document successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
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
    done: false
  };
  return dispatch =>
    db
      .collection("todos")
      .add(todo)
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
};
