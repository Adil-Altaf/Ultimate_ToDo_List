// Database name- global scope
var database_name = "toDoDatabase";

// Database version - global scope
var DBversion = 1,
  tableName = "taskListTable";

(function () {
  'use strict';

  //check for support of indexedDB
  try {
    if (!('indexedDB' in window)) {
      console.log('This browser doesn\'t support IndexedDB');
      return;
    }

    // if support is positive call function to create indexedDB
    createDB();
  }
  catch{
    // in case no support for indexeddb
    console.log(Error);
  }
})();



function createDB() {
  // creating indexeddb using idb api
  var dbPromise = idb.open(database_name, DBversion, function (upgradeDB) {

    // creating object store
    var store = upgradeDB.createObjectStore(tableName, {
      keyPath: 'task_id'
    });
    console.log("DB upgraded!!");
  });
}



function updateTaskStatus(t_id) {
  // function for updating taks data

  // open database
  idb.open(database_name, DBversion).then(function (db) {

    //assign readwrite right on transaction
    var tx = db.transaction(tableName, 'readwrite');

    // refrence of table (store)
    var store = tx.objectStore(tableName);

    // retrieving specific ID record from indexeddb 
    store.get(t_id).then(function (record) {

      //updating status to done
      var result = store.put({
        task_id: t_id,
        taskTitle: record.taskTitle,
        taskDesc: record.taskDesc,
        status: true
      });
      console.log("record updated");

    });
  })
}

function addRecord(t_id, title, description) {
  // function to add new record


  //assign readwrite right on transaction
  idb.open(database_name, DBversion).then(function (db) {

    // refrence of table (store)
    var tx = db.transaction(tableName, 'readwrite');

    // retrieving specific ID record from indexeddb 
    var store = tx.objectStore(tableName);

    //adding new record
    var result = store.add({
      task_id: t_id,
      taskTitle: title,
      taskDesc: description,
      status: false
    }).then(() => {
      console.log("record added");
    }).catch((e) => {
      console.log("error", e);
    });
  }).catch(function (e) {
    console.log("Record NOT added!", e);
  });
}


function removeRecord(t_id) {
  //function to remove specific record

  //assign readwrite right on transaction
  idb.open(database_name, DBversion).then(function (db) {

    // refrence of table (store)
    var tx = db.transaction(tableName, 'readwrite');

    // retrieving specific ID record from indexeddb 
    var store = tx.objectStore(tableName);

    //deleting specific record from indexdb
    store.delete(t_id);
    console.log("Record deleted!");
  })
    .catch(function (e) {
      console.log("Record NOT deleted!", e);
    });
}

function clearIndexDB_Data() {
  //funciton to clear all record from indexeddb


  //assign readwrite right on transaction
  idb.open(database_name, DBversion).then(function (db) {

    // refrence of table (store)
    var tx = db.transaction(tableName, 'readwrite');

    // retrieving specific ID record from indexeddb 
    var store = tx.objectStore(tableName);

    // clearing indexeddb
    store.clear();
    console.log("Database cleared!");
  })
    .catch(function (e) {
      console.log("Database NOT Cleared!", e);
    });
}

function getAll() {
  //funciton to  retreiving all record from indexeddb
  console.log("from indexdb IDB get function");

  //opening database
  idb.open(database_name, DBversion)
    .then(function (db) {
      // refrence of table (store)
      var tx = db.transaction(tableName, 'readonly');

      // retrieving specific ID record from indexeddb 
      var store = tx.objectStore(tableName);

      // this will return cursor which will use to navigate records
      return store.openCursor();
    })
    .then(function logItems(cursor) {
      if (!cursor) {
        // if no cursor then exit funciton
        return;
      }

      // this funciton will display task on screen
      addTask(cursor.value.task_id, cursor.value.taskTitle, cursor.value.taskDesc, cursor.value.status, false, false);

      // itterate record
      return cursor.continue().then(logItems);
    })
    .then(function () {
      console.log('Done cursoring');
    })
    .catch(e => console.log("error", e));
}
