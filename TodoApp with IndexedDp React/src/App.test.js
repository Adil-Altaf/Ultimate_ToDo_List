import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import App from './App';
import Todo from './screens/TodoScreen/Todo';
import NavBar from './component/NavBar/NavBar';

/**
 * Testing for react Components 
 * if theay are rendaring without breing crash and
 * creating a perfect snapshot 
 */

//To Test Navbar Component  
describe('NavBar', () => {
    it('NavBar renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<NavBar />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    test('also has a valid snapshot', () => {
        const component = renderer.create(
            <NavBar />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

//To Test  our main App Component  

describe('App', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    test('has a valid snapshot', () => {
        const component = renderer.create(
            <App />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

//Test The Todo Component
describe('Todos', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Todo />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    test('has a valid snapshot', () => {
        const component = renderer.create(
            <Todo />
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

