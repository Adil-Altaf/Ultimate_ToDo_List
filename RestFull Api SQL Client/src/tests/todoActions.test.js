import createMockStore from 'redux-mock-store';
import { GET_TASKS, DELETE_TASK, UPDATE_TASK, DONE_TASK } from '../store/actions/actionTypes';
import { getTasks, deleteTask, updateTask, doneTodo } from '../store/actions/todoActions';
import thunk from 'redux-thunk';
const middlewares = [thunk]
const mockStore = createMockStore(middlewares)

describe('should get taks', ()=> {
  
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 80000;
  test('should get tasks', (done)=> {
    const initialState = {}
    const store = mockStore(initialState)
    store.dispatch(getTasks()).then(()=>{
     const actions = store.getActions();
     expect(actions[0]).toEqual({
       type: GET_TASKS,
       payload: expect.anything()
     })
      done();
    })
   }) 

  //  test('should add tasks', (done)=> {
  //   const task = {
  //     todoTitle: "title",
  //     todoDescription: "description"
  //   }
  //   const tasks = addTask(task);
  //   expect(tasks).toEqual(task);
  //    done();
  //  }); 


  test('should delete tasks', (done)=> {
    const initialState = {}
    const store = mockStore(initialState)
    store.dispatch(deleteTask(21)).then(()=>{
     const actions = store.getActions();
     expect(actions).toEqual([{
       type: DELETE_TASK,
       payload: 21
     }])
      done();
    })
   }) 


   test('should update tasks', (done)=> {
    const initialState = {}
    const store = mockStore(initialState)
    const task = {id: 123, todoDescription: "desc", todoTitle: "title"}
    store.dispatch(updateTask(task)).then(()=>{
     const actions = store.getActions();
     expect(actions).toEqual([{
       type: UPDATE_TASK,
       payload: task
     }])
      done();
    })
   }) 

   test('should done task', (done)=> {
    const initialState = {}
    const store = mockStore(initialState)
    const task = {id: 123, todoDescription: "desc", todoTitle: "title", complete: false}
    store.dispatch(doneTodo(task)).then(()=>{
     const actions = store.getActions();
     expect(actions).toEqual([{
       type: DONE_TASK,
       payload: task.id
     }])
      done();
    })
   }) 
});