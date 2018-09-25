import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import { GET_TASKS, ADD_TASK, DELETE_TASK, UPDATE_TASK, DONE_TASK } from '../store/actions/actionTypes';
import { getTasks, addTask, deleteTask, updateTask, doneTodo } from '../store/actions/todoActions';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('should get taks', ()=> {
    let store;
    beforeEach(function () {
        moxios.install();
      });
    
      afterEach(function () {
        moxios.uninstall();
      });
    
      it('creates GET_TASKS after successfuly', () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
          });
        });
    
        const expectedActions = [
            {
                "type": "GET_TASKS",
                "payload": undefined,
            }
        ];
    
        const store = mockStore({})
        let todoId = 1;
        return store.dispatch(getTasks(todoId)).then(() => {
          // return of async actions
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
});

describe('should delete taks', ()=> {
    let store;
    beforeEach(function () {
        moxios.install();
      });
    
      afterEach(function () {
        moxios.uninstall();
      });
    
      it('creates DELETE_TASK after successfuly fetching postse', () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
          });
        });
    
        const expectedActions = [
            {
                "type": "DELETE_TASK",
                "payload": 1,
            }
        ];
    
        const store = mockStore({})
        let todoId = 1;
        return store.dispatch(deleteTask(todoId)).then(() => {
          // return of async actions
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
}); 

describe('should add taks', ()=> {
    let store;
    beforeEach(function () {
        moxios.install();
      });
    
      afterEach(function () {
        moxios.uninstall();
      });
    
      it('creates ADD_TASK after successfuly', () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
          });
        });
    
        const expectedActions = [];
    
        const store = mockStore({})
        let todoId = {
            todoTitle: "123",
            todoDescription: "123"
        }
        return store.dispatch(addTask(todoId)).then(() => {
          // return of async actions
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
}); 

describe('should updateTask taks', ()=> {
    let store;
    beforeEach(function () {
        moxios.install();
      });
    
      afterEach(function () {
        moxios.uninstall();
      });
    
      it('creates UPDATE_TASK after successfuly', () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
          });
        });
    
        const expectedActions = [
            {
            type: "UPDATE_TASK",
            payload: {
                _id: "58" ,
                todoTitle: undefined,
                todoDescription: undefined
            }
            }
        ];
    
        const store = mockStore({})
        return store.dispatch(updateTask({id : "58", todoTitle : undefined, todoDescription : undefined})).then(() => {
          // return of async actions
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
}); 