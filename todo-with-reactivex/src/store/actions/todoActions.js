import {GET_TASKS , DONE_TASK, GET_ERROR,
         ADD_TASK , UPDATE_TASK , DELETE_TASK , 
         GET_TASKS_SUCCESS , ADD_TASK_SUCCESS , 
         DELETE_TASK_SUCCESS, UPDATE_TASK_SUCCESS}
from './actionTypes';



export const getErrors = (error) =>  dispatch =>{
    dispatch({
        type : GET_ERROR,
        payload : error
    })
}

export const getTasksRequest = () =>({type : GET_TASKS})

export const getTasksSuccess = (tasks) => ({type : GET_TASKS_SUCCESS , payload : tasks})




export const addTaskRequest = (task) =>({type : ADD_TASK , payload : task})

export const addTaskSuccess = () =>({type : ADD_TASK_SUCCESS})


export const deleteTaskRequest =   (id) => ({type : DELETE_TASK , payload : id})

export const deleteTaskSuccess = () =>({type : DELETE_TASK_SUCCESS})



export const updateTaskRequest = (updatedTask) =>({type : UPDATE_TASK , payload : updatedTask})

export const updateTaskSuccess = (updatedData) => {
    const updatedTask = {
        todotitle : updatedData.title,
        tododescription : updatedData.description,
        id : updatedData.id,
        complete : updatedData.complete
    }
    return ({type : UPDATE_TASK_SUCCESS , payload : updatedTask})
}



// export const doneTask = (id) => dispatch =>{
//     db.collection('tasks').doc(id).update({done : true}).then(() =>{
//         dispatch({
//             type : DONE_TASK,
//             snack : 'Tas has been done'
//         })
//     })
// }