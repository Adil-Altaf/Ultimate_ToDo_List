var database_name = "toDoDatabase",
  DBversion = 1,
  tableName = "taskListTable";

(function () {
  'use strict';

  //check for support
  if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
    return;
  }
 
  createDB();
}) ();



function createDB() {
  var dbPromise = idb.open(database_name, DBversion, function (upgradeDB) {
    var store = upgradeDB.createObjectStore(tableName, {
      keyPath: 'task_id'
    });
    console.log("DB upgraded!!");
  });
}



function updateTaskStatus(t_id) {

  idb.open(database_name, DBversion).then(function (db) {
    var tx = db.transaction(tableName, 'readwrite');
    var store = tx.objectStore(tableName);

    store.get(t_id).then(function (record) {

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

  idb.open(database_name, DBversion).then(function (db) {
    var tx = db.transaction(tableName, 'readwrite');
    var store = tx.objectStore(tableName);

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
  idb.open(database_name, DBversion).then(function (db) {
    var tx = db.transaction(tableName, 'readwrite');
    var store = tx.objectStore(tableName);

    store.delete(t_id);
    console.log("Record deleted!");
  })
    .catch(function (e) {
      console.log("Record NOT deleted!", e);
    });
}

function clearIndexDB_Data() {
  idb.open(database_name, DBversion).then(function (db) {
    var tx = db.transaction(tableName, 'readwrite');
    var store = tx.objectStore(tableName);

    store.clear();
    console.log("Database cleared!");
  })
    .catch(function (e) {
      console.log("Database NOT Cleared!", e);
    });
}


function getAll() {
  console.log("from indexdb IDB get function");

  idb.open(database_name, DBversion).then(function (db) {
    var tx = db.transaction(tableName, 'readonly');
    var store = tx.objectStore(tableName);
    return store.openCursor();
  }).then(function logItems(cursor) {
    if (!cursor) {
      return;
    }

    addTask(cursor.value.task_id, cursor.value.taskTitle, cursor.value.taskDesc, cursor.value.status, false, false);

    return cursor.continue().then(logItems);
  }).then(function () {
    console.log('Done cursoring');
  });
}

