var taskArrayMain = [];
var idCounter = 0;

function returnTask(id,taskTitle, TaskDesc) {

    var task = {
        taskId: id,
        taskTitle: taskTitle,
        TaskDesc: TaskDesc
    };

    idCounter = id;
    clearFields();
    return task;
}


function clearFields() {
    document.getElementById("txtTitle").value = "";
    document.getElementById("txtDesc").value = "";
    document.getElementById("txtTitle").focus();
}

function addTask(id, title, desc, addToIndexDBFlag) {  // function to add task

    var htmlText = `<tr id='task_row_${id}'><td class='makeItCenter'>${id}</td>`;
    htmlText += `<td> ${changeCase(title)} </td><td> ${changeCase(desc)} </td> `;
    htmlText += `<td class='makeItCenter'><img src='images/right_tick.png' alt='Task done!' id='row_img_${id}' onclick="task_done('row_img_${id}');"></td>`;
    htmlText += `<td class='makeItCenter'><img src='images/wrong_tick.png' alt='Remove Task!' onclick="delete_task('task_row_${id}');"></td></tr>`;

    document.getElementById('tasksTableBody').innerHTML += htmlText;

    taskArrayMain.push(returnTask(id,title, desc));

    if (addToIndexDBFlag) {
        addRecord(idCounter, title, desc);
    }
}

function task_done(row_id) {
    document.getElementById(row_id).setAttribute("src", "images/done.png");
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

    for (var i = 0; i < taskArrayMain.length; i++) {
        if (taskArrayMain[i].taskid === taskid) {
            taskArrayMain.splice(i, 1);
        }
    }
    removeRecord(Number(taskid.slice(9, taskid.length)));
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
        addTask(++idCounter, varTaskTitle.value.trim(), varTaskDesc.value.trim(), true);
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
