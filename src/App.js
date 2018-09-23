import React, { Component } from 'react';
import  {Provider} from 'react-redux';
import store from './store/index';
import Home from './components/home/Home';
import Task from './components/task/Task';
import {BrowserRouter as  Router  , Route ,  } from 'react-router-dom';
class App extends Component {


  render() {
    return (
      <Provider store = {store} >
      <div>
        <Router>
          <div>
          <Route exact path = "/" component = {Home} />
          <Route exact path = "/tasks" component = {Task} />
          </div>
        </Router>
        </div>
      </Provider>
    );
  }
}

export default App;

