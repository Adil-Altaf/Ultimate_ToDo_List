var idCounter = 0;

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

function addTask(id, title, desc, status, addToAPIFlag) {  // function to add task
    var img;
    var varOnClick;
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

    idCounter = id;
    clearFields();

    if (addToAPIFlag) {
        addRecordToServer(idCounter, title, desc);
    }
}

function task_done(row_id) {
    document.getElementById(row_id).setAttribute("src", "images/done.png");
    document.getElementById(row_id).setAttribute("onclick", "");
    updateTaskStatusToServer(Number(row_id.slice(8, row_id.length)));
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

    removeRecordFromServer(Number(taskid.slice(9, taskid.length)));
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
        addTask(++idCounter, varTaskTitle.value.trim(), varTaskDesc.value.trim(), false, true);
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
    var fetchFromAPI = "https://api.github.com/users/zeeshanhanif/following"; //REST API link will come here

    var networkUpdate = fetch(fetchFromAPI).then(function (response) {
        // return data in json form
        return response.json();
    }).then(function (data) {
        // if data (json) received it will update user screen
        updatePage(data);
    });

}

function updatePage(data) {
    for (var i = 0; i < data.length; i++) {
        // adding all records received from server in form of json


        // field value to be adjusted according to JSON
        addTask(i + " ---" + data[i].id, data[i].login, data[i].login, false, false);
    }
}


function updateTaskStatusToServer(t_id) {

    // REST API For update status will come here

}

function addRecordToServer(t_id, title, description) {

    // REST API to Add new task will come here

}

function removeRecordFromServer(t_id) {

    // REST API to remove new task will come here

}

getData();