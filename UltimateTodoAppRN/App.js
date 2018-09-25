import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./src/store/reducers/index";
import thunk from "redux-thunk";
import TodoList from "./src/TodoList";

const store = createStore(reducers, {}, applyMiddleware(thunk));

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
  }
}
