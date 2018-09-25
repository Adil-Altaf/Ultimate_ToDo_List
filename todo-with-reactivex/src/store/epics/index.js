import { combineEpics } from 'redux-observable';
import {getAllTaskEpic , postTaskEpic , deleteTaskEpic , updateTaskEpic , doneTaskEpic} from './tasksEpic';
export const rootEpic = combineEpics(getAllTaskEpic , postTaskEpic,deleteTaskEpic , updateTaskEpic , doneTaskEpic);