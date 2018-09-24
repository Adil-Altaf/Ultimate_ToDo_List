import { combineEpics } from 'redux-observable';
import {getAllTaskEpic , postTaskEpic , deleteTaskEpic , updateTaskEpic} from './tasksEpic';
export const rootEpic = combineEpics(getAllTaskEpic , postTaskEpic,deleteTaskEpic , updateTaskEpic);