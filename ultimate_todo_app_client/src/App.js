import React, { Component } from 'react';
import Todo from './screens/TodoScreen/Todo';
import './Style/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'
import NavBar from './component/NavBar/NavBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar>
          Ultimate Todo App
        </NavBar>
        <Todo />
      </div>
    );
  }
}

export default App;
