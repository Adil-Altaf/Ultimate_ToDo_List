import * as AllAction from '../actions/todoActions';
import { ofType } from 'redux-observable';
import {map , mergeMap} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { GET_TASKS, ADD_TASK, DELETE_TASK, UPDATE_TASK, DONE_TASK } from '../actions/actionTypes';


export const getAllTaskEpic = (action$) => {
    return action$.pipe(
        ofType(GET_TASKS),
        mergeMap(() =>
            ajax.getJSON('http://team-alpha-todo.herokuapp.com/todo/api/v1.0/tasks/').pipe(
                map(response => AllAction.getTasksSuccess(response))
            )
    )
    )
}


export const postTaskEpic = (action$)=> {
    return action$.pipe(
        ofType(ADD_TASK),
        mergeMap(action =>{
            const task = {todoTitle : action.payload.title , todoDescription : action.payload.description}
            console.log(task)
            return ajax.post(
                'http://team-alpha-todo.herokuapp.com/todo/api/v1.0/tasks/',
                task,
                { 'Content-Type': 'application/json' }
            ).pipe(
                map(() => AllAction.addTaskSuccess())
            )
        })
    )
}


export const deleteTaskEpic = (action$) => {
    return action$.pipe(
        ofType(DELETE_TASK),
        mergeMap(action =>{
            return ajax.delete(`http://team-alpha-todo.herokuapp.com/todo/api/v1.0/tasks/${action.payload}`,
            { 'Content-Type': 'application/json' }
        ).pipe(
            map(() => AllAction.deleteTaskSuccess() )
        )
         })
    )
}

export const updateTaskEpic = (action$ , state$) => {
    return action$.pipe(
        ofType(UPDATE_TASK),
        mergeMap(action =>{
            const updatedResponse = state$.value.TaskReducer.updatedTask
            const updatedTask = {
                todoTitle : action.payload.title,
                todoDescription : action.payload.description,
                complete : false
            }
            return ajax.put(`http://team-alpha-todo.herokuapp.com/todo/api/v1.0/tasks/${action.payload.id}`,
            updatedTask,
            { 'Content-Type': 'application/json' }
        ).pipe(
            map(() => AllAction.updateTaskSuccess(updatedResponse))
        )
         })
    )
}

export const doneTaskEpic = (action$ , state$) => {
    return action$.pipe(
        ofType(DONE_TASK),
        mergeMap(action =>{
            const doneResponse = state$.value.TaskReducer.doneTask;
            const doneTask = {
                todoTitle : action.payload.title,
                todoDescription : action.payload.description,
                complete : true
            }
            return ajax.put(`http://team-alpha-todo.herokuapp.com/todo/api/v1.0/tasks/${action.payload.id}`,
            doneTask,
            { 'Content-Type': 'application/json' }
            ).pipe(
                map(() => AllAction.doneTaskSuccess(doneResponse))
            )
        })
    )
}
