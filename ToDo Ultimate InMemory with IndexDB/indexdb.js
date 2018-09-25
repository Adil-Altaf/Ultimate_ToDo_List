window.indexedDB = window.indexedDB || window.mozIndexDB || window.webkitIndexDB || window.msIndexDB;

if (!window.indexedDB) {
    console.log("Index DB not supported!!");
}

var database_name = "toDoDatabase",
    database_system = window.indexedDB.open(database_name, 1),
    db,
    tranx,
    table_store,
    index;

database_system.onupgradeneeded = function (e) {
    db = database_system.result,
        table_store = db.createObjectStore("taskListTable", { keyPath: "task_id" });

    // I am skiping index part for now
    //        index = table_store.createIndex("taskTitle", "taskTitle", { unique: false });

    console.log("DB upgraded!");
};

database_system.onerror = function (e) {
    console.log("Error occured:" + e.target.errorCode);
};

database_system.onsuccess = function (e) {
    db = database_system.result;
    tranx = db.transaction("taskListTable", "readwrite");

    table_store = tranx.objectStore("taskListTable");
    //  index = table_store.index("taskTitle")

    db.onerror = function (e) {
        console.log("Error occured:" + e.target.errorCode);
    }

    db.onsuccess = function () {
        console.log("DB initialization successful!");
    }

    getAllRecords();
    tranx.oncomplete = function () {
        //        db.close();
    }
};


function getAllRecords() {
    var countRec = 0;
    db = database_system.result;
    tranx = db.transaction("taskListTable", "readwrite");
    table_store = tranx.objectStore("taskListTable");

    table_store.openCursor().onsuccess = function (e) {

        var cursor = e.target.result;
        if (cursor) {
            addTask(cursor.value.task_id, cursor.value.taskTitle, cursor.value.taskDesc, cursor.value.status, false);
            countRec++;
            cursor.continue();
        } else {
            console.log(countRec + " records retrieved from indexDB");
        }
    }
}

function updateTaskStatus(t_id) {
    db = database_system.result,
        tranx = db.transaction("taskListTable", "readwrite"),
        table_store = tranx.objectStore("taskListTable");

    var record = table_store.get(t_id);

    record.onsuccess = function () {
        var currentRec = record.result
        currentRec.status = true;

        var updateRecord = table_store.put(currentRec);
        updateRecord.onsuccess = function () {
            console.log("Record updated!");
        }
        updateRecord.onerror = function (e) {
            console.log("Error occured:" + e.target.errorCode);
        }

    }
    record.onerror = function (e) {
        console.log("Error occured:" + e.target.errorCode);
    }
}

function addRecord(t_id, title, description) {
    db = database_system.result;
    tranx = db.transaction("taskListTable", "readwrite"),
        table_store = tranx.objectStore("taskListTable");

    var result = table_store.put({
        task_id: t_id,
        taskTitle: title,
        taskDesc: description,
        status: false
    });

    result.onsuccess = function () {
        console.log("Record Added!");
    }
    result.onerror = function (e) {
        console.log("Error occured:" + e.target.errorCode);
    }
}

function removeRecord(t_id) {
    db = database_system.result;
    tranx = db.transaction("taskListTable", "readwrite"),
        table_store = tranx.objectStore("taskListTable");
    var result = table_store.delete(t_id);

    result.onsuccess = function () {
        console.log("Record for Task ID - ", t_id, " deleted!");
    }
    result.onerror = function (e) {
        console.log("Error occured:" + e.target.errorCode);
    }
}
