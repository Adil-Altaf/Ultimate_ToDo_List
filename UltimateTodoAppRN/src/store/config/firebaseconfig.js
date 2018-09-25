import * as firebase from "firebase";
import "firebase/firestore";
var config = {
  apiKey: "AIzaSyBF3jyHgK1YJMcPIrivoWmeWz7fIoaBA30",
  authDomain: "ultimatetodorn.firebaseapp.com",
  databaseURL: "https://ultimatetodorn.firebaseio.com",
  projectId: "ultimatetodorn",
  storageBucket: "ultimatetodorn.appspot.com",
  messagingSenderId: "1038900494688"
};
firebase.initializeApp(config);

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});
export { db, firebase };


