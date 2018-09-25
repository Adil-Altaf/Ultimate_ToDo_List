import React, { Component } from "react";
import { Container } from "native-base";
import { createStackNavigator } from "react-navigation";
import WelcomeScreen from "./screens/WelcomeScreen";
import TodoListScreen from "./screens/TodoList";

class TodoList extends Component {
  render() {
    return (
      <Container>
        <AppNavigator />
      </Container>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    TodoList: TodoListScreen
  },
  {
    initialRouteName: "Welcome"
  }
);

export default TodoList;
