import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import rootReducer from './store/reducers/index';
import {rootEpic} from './store/epics/index'; 
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { Provider } from 'react-redux';

const epicMiddleware = createEpicMiddleware();

const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
const appWithProvider = (
    <Provider store={store}>
        <App />
    </Provider>
);
epicMiddleware.run(rootEpic)

ReactDOM.render(appWithProvider, document.getElementById('root'));

registerServiceWorker();
