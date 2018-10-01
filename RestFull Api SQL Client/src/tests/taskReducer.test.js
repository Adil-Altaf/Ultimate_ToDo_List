import reducer from '../store/reducers/taskReducer';
// import { getTasks, deleteTask, updateTask, doneTodo } from '../store/actions/todoActions';
// import { GET_TASKS, DELETE_TASK, UPDATE_TASK, DONE_TASK } from '../store/actions/actionTypes';

describe('team reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                tasks: [],
                loader: false,
            }
        )
      })
    
  });