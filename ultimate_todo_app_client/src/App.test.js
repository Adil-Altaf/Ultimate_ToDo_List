import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Todo from './screens/TodoScreen/Todo';
import NavBar from './component/NavBar/NavBar';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders Todo List  without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Todo />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Header Should Work Fine', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NavBar>Some Text</NavBar>, div);
  ReactDOM.unmountComponentAtNode(div);
});