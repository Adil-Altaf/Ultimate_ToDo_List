import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { MockFirestore } from "firebase-mock";
import { postTodo, fetchTodos } from "./src/store/actions/index";
import * as firebase from "firebase";
import { ADD_TODO, FETCH_TODOS, DELETE_TODO } from "./src/store/actions/types";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

function mockFirebaseService() {
  return new Promise(resolve => resolve(true));
}

// Since "services/firebase" is a dependency on this file that we are testing,
// we need to mock the child dependency.
jest.mock(firebase, () => new Promise(resolve => resolve(true)));

let mockProps;

describe("todos actions", () => {
  let store;

  it("Post todo action test", () => {
    const todo = {
      title: "Testing done",
      description: "mjsa na hopai ga",
      done: false,
      timestamp: Date.now()
    };
    const expectedAction = [
      {
        type: ADD_TODO,
        todo
      }
    ];
    store = mockStore({});
    return store.dispatch(postTodo(todo.title, todo.description)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
  it("Delete todo action test", () => {
      const expectedAction = [
          {
              type: DELETE_TODO,
              id
          }
      ]
  })
});
