import {GET_TASKS , GET_ERROR, ADD_TASK , UPDATE_TASK , DELETE_TASK} from './actionTypes';
import db from '../../config/firestore';

export const getTasks = () => dispatch =>{
    db.settings({
        timestampsInSnapshots: true
      });
    const tasks = [];
    db.collection('tasks').get()
    .then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            tasks.push({
                id : doc.id,
                title : doc.data().title,
                description : doc.data().description,
                time : doc.data().time,
                done : doc.data().done
            })
        });
        dispatch({
            type : GET_TASKS,
            payload : tasks
        })
    }).catch((err)=>{
        dispatch({
            type : GET_ERROR,
            snack : err
        })
    })
};


export const addTask = (task) => dispatch =>{
    db.settings({
        timestampsInSnapshots: true
      });
    db.collection("tasks").add(task).then(()=>{
        dispatch({
            type : ADD_TASK,
            snack : 'task has been added'
        })
    }).catch((err)=>{
        dispatch({
            type : GET_ERROR,
            snack : err
        })
    })
};



export const deleteTask =   (id) => dispatch =>{
    db.settings({
        timestampsInSnapshots: true
      });
      db.collection('tasks').doc(id).delete()
      .then(()=>{
        dispatch({
            type : DELETE_TASK,
            snack : 'task has been deleted'
        })
      }).catch((err)=>{
        dispatch({
            type : GET_ERROR,
            snack : err
        })
      })
};


export const updateTask = (task) => dispatch =>{
    const updatedTask = {
        title : task.title,
        descriptio : task.description,
        time : task.time,
        done : false
    }
    db.collection('tasks').doc(task.id).set(updatedTask)
    dispatch({
        type : UPDATE_TASK,
        snack : 'task has been updated'
    })
}