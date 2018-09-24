var taskArrayMain = [];
var idCounter = 0;

function returnTask(taskTitle, TaskDesc) {

    var task = {
        taskId: idCounter++,
        taskTitle: taskTitle,
        TaskDesc: TaskDesc
    };

    clearFields();
    return task;
}


function clearFields() {
    document.getElementById("txtTitle").value = "";
    document.getElementById("txtDesc").value = "";
    document.getElementById("txtTitle").focus();
}

function addTask(title, desc) {  // function to add task

    var htmlText = `<tr id='task_row_${idCounter}'><td class='makeItCenter'>${idCounter + 1}</td>`;
    htmlText += `<td> ${changeCase(title)} </td><td> ${changeCase(desc)} </td> `;
    htmlText += `<td class='makeItCenter'><img src='images/right_tick.png' alt='Task done!' id='row_img_${idCounter}' onclick="task_done('row_img_${idCounter}');"></td>`;
    htmlText += `<td class='makeItCenter'><img src='images/wrong_tick.png' alt='Remove Task!' onclick="delete_task('task_row_${idCounter}');"></td></tr>`;

    document.getElementById('tasksTableBody').innerHTML += htmlText;

    taskArrayMain.push(returnTask(title, desc));
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
        addTask(varTaskTitle.value.trim(), varTaskDesc.value.trim());
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
