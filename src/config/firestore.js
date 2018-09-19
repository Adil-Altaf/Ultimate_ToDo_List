import firebase from 'firebase';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA0X0bQpe7QGh_P4EU6BuFL6CrDMt8beRk",
    authDomain: "ultimate-todo-react.firebaseapp.com",
    databaseURL: "https://ultimate-todo-react.firebaseio.com",
    projectId: "ultimate-todo-react",
    storageBucket: "ultimate-todo-react.appspot.com",
    messagingSenderId: "310050486383"
  };
  firebase.initializeApp(config);


const db = firebase.firestore();
  export default db;