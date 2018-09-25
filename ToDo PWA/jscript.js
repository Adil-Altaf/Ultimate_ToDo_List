var idCounter = 0;

// noSQL API link - global scope for later use
var fetchFromAPI = "https://mongonosql.herokuapp.com/todo/api/v1.0/tasks"; //REST API link will come here

if ('serviceWorker' in navigator) {
    // if service worker found
    console.log("service worker found");

    // register service worker
    navigator.serviceWorker.register('/sw.js')
        .then(function (val) {
            console.log("Result of sw registration: " + val);
        })
        .catch(function (err) {
            console.log("ERROR of sw registration: " + err);
        });
}

function clearFields() {
    //empty text boxes on screen

    document.getElementById("txtTitle").value = "";
    document.getElementById("txtDesc").value = "";

    //get you input focus to task title field
    document.getElementById("txtTitle").focus();
}

function addTask(id, title, desc, status, addToAPIFlag = false, addToIndexDB = true) {  // function to add task
    // main function to add task from here it will add on server and indexeddb

    var img;
    var varOnClick;
    var id = id;

    // if flag for add to server using API is true then go to add record to server
    if (addToAPIFlag) {

        //calling function to add record to server using API, function will return response promise
        addRecordToServer(idCounter, title, desc).then(a => {

            // if added to server successful then add to indexeddb
            addTaskLocal(a._id, title, desc, false, addToIndexDB);
        })
            .catch(e => alert("Error: Record not added", e));

    } else {
        // if flag for add to server using API is FALSE then go to add to indexeddb ONLY
        addTaskLocal(id, title, desc, status, addToIndexDB)
    }
}
function addTaskLocal(id, title, desc, status, addToIndexDB = true) {  // function to add task    
    //  function to add task to indexeddb

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

    // creating html text to display on screen for new task created
    var htmlText = `<tr id='task_row_${id}'><td class='makeItCenter'>${id}</td>`;
    htmlText += `<td> ${changeCase(title)} </td><td> ${changeCase(desc)} </td> `;
    htmlText += `<td class='makeItCenter'><img src='images/${img}.png' alt='Task done!' id='row_img_${id}' onclick="${varOnClick}"></td>`;
    htmlText += `<td class='makeItCenter'><img src='images/wrong_tick.png' alt='Remove Task!' onclick="delete_task('task_row_${id}');"></td></tr>`;

    document.getElementById('tasksTableBody').innerHTML += htmlText;

    // clear text boxes
    clearFields();
}

function task_done(row_id) {
    // if user click on task done icon
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
    // text field validation function
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
    //update task status to server using API
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

    //fetch API with PUT
    var tmp = fetch(fetchFromAPI + "/" + t_id, options)
        .then(res => res.json())
        .then(res => res) //returning updated record
        .catch(err => console.log('Error, with message:', err.statusText));

}

function removeRecordFromServer(t_id) {
    //function to delete record on server

    const myPost = {
        _id: t_id
    };

    const options = {
        method: 'DELETE'
    };

    // fetch api to delete record
    fetch(fetchFromAPI + "/" + t_id, options)
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log('Error, with message:', err.statusText));
}


function addRecordToServer(t_id, tmp_title, tmp_description) {
    // function adding record to server
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

    // fetch API called method POST
    return fetch(fetchFromAPI, options)
        .then(res => res.json())
        .then(res => res)// returning auto generated ID from server
        .catch(err => console.log('Error, with message:', err.statusText));
}


// when user come to site it will go and fetch data from server or indexeddb and display to screen
getData();