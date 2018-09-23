var idCounter = 0;
var fetchFromAPI = "https://mongonosql.herokuapp.com/todo/api/v1.0/tasks"; //REST API link will come here

if ('serviceWorker' in navigator) {
    console.log("service worker found");

    navigator.serviceWorker.register('/sw.js')
        .then(function (val) {
            console.log("Result of sw registration: " + val);
        })
        .catch(function (err) {
            console.log("ERROR of sw registration: " + err);
        });
}

function clearFields() {
    document.getElementById("txtTitle").value = "";
    document.getElementById("txtDesc").value = "";
    document.getElementById("txtTitle").focus();
}

function addTask(id, title, desc, status, addToAPIFlag = false, addToIndexDB = true) {  // function to add task
    var img;
    var varOnClick;
    var id = id;
    //var idCounter = id;

    if (addToAPIFlag) {
        addRecordToServer(idCounter, title, desc).then(a => {
            addTaskLocal(a._id, title, desc, false, addToIndexDB);
        })
            .catch(e => alert("Error: Record not added", e));

    } else {
        addTaskLocal(id, title, desc, status, addToIndexDB)
    }
}
function addTaskLocal(id, title, desc, status, addToIndexDB = true) {  // function to add task    
    if (addToIndexDB) {
        addRecord(id, title, desc);          // add records to indexDB
    }


    if (status) {
        img = "done";
        varOnClick = ""
    } else {
        img = "right_tick";
        varOnClick = `task_done('row_img_${id}');`
    }

    var htmlText = `<tr id='task_row_${id}'><td class='makeItCenter'>${id}</td>`;
    htmlText += `<td> ${changeCase(title)} </td><td> ${changeCase(desc)} </td> `;
    htmlText += `<td class='makeItCenter'><img src='images/${img}.png' alt='Task done!' id='row_img_${id}' onclick="${varOnClick}"></td>`;
    htmlText += `<td class='makeItCenter'><img src='images/wrong_tick.png' alt='Remove Task!' onclick="delete_task('task_row_${id}');"></td></tr>`;

    document.getElementById('tasksTableBody').innerHTML += htmlText;


    clearFields();
}

function task_done(row_id) {
    document.getElementById(row_id).setAttribute("src", "images/done.png");
    document.getElementById(row_id).setAttribute("onclick", "");


    updateTaskStatus(row_id.slice(8, row_id.length));  // update task status at indexDB
    updateTaskStatusToServer(row_id.slice(8, row_id.length));// update task status at server with API
}

function delete_task(taskid) {  // this funciton is to delete to do task from list
    var varTask = document.getElementById(taskid);
    var parId = varTask.parentElement;
    varTask = parId.childNodes;

    //find childNode number of received element ID as argument
    for (var i = 0; i < varTask.length; i++) {
        if (parId.childNodes[i].id === taskid) {
            //remove child element from list
            parId.removeChild(parId.childNodes[i]);
            break;
        }
    }

    removeRecord(taskid.slice(9, taskid.length)); // remove record from indexDB

    removeRecordFromServer(taskid.slice(9, taskid.length)); // remove record from Server (API)
}

function validateTaskInput() {
    var allOkFlag = true;

    // assign task, date and time to variables
    var varTaskTitle = document.getElementById('txtTitle');
    var varTaskDesc = document.getElementById('txtDesc');

    if (varTaskTitle.value.trim() == "") {
        alert("Kindly enter work TODO Title!");
        varTaskTitle.focus();
        allOkFlag = false;

    } else if (varTaskDesc.value.trim() == "") {
        alert("Kindly enter work TODO work description");
        varTaskDesc.focus();
        allOkFlag = false;
    }

    if (allOkFlag) {
        addTask(null, varTaskTitle.value.trim(), varTaskDesc.value.trim(), true, true);
    }
}

function changeCase(txt) { // function to change case of first letter of every word
    txt = txt.trim();
    var newTxt = txt.charAt(0).toUpperCase();

    for (var i = 1; i < txt.length; i++) {

        if (txt.charAt(i) !== " ") {
            newTxt += txt.charAt(i);
        } else {
            newTxt += txt.charAt(i);
            newTxt += txt.charAt(++i).toUpperCase();
        }

    }
    return newTxt;
}


function getData() {
    // fetching data from Server
    var networkUpdate = fetch(fetchFromAPI).then(function (response) {
        // return data in json form
        clearIndexDB_Data();
        return response.json();
    }).then(function (data) {
        // if data (json) received it will update user screen
        updatePage(data);
    }).catch((e) => {
        getAll();
        console.log("no internet/cache!", e);
    });
}

function updatePage(data) {
    for (var i = 0; i < data.length; i++) {
        // adding all records received from server in form of json

        // field value to be adjusted according to JSON
        addTask(data[i]._id, data[i].title, data[i].description, data[i].done);


    }
}


function updateTaskStatusToServer(t_id) {
    const myPost = {
        done: true
    };
    const options = {
        method: 'PUT',
        body: JSON.stringify(myPost),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    var tmp = fetch(fetchFromAPI + "/" + t_id, options)
        .then(res => res.json())
        .then(res => res) //returning updated record
        .catch(err => console.log('Error, with message:', err.statusText));

}

function removeRecordFromServer(t_id) {
    const myPost = {
        _id: t_id
    };

    const options = {
        method: 'DELETE'
    };

    fetch(fetchFromAPI + "/" + t_id, options)
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log('Error, with message:', err.statusText));
}


function addRecordToServer(t_id, tmp_title, tmp_description) {
    const myPost = {
        title: tmp_title,
        description: tmp_description
    };

    const options = {
        method: 'POST',
        body: JSON.stringify(myPost),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(fetchFromAPI, options)
        .then(res => res.json())
        .then(res => res)// returning auto generated ID from server
        .catch(err => console.log('Error, with message:', err.statusText));
}



getData();