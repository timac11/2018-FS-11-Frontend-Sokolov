import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import chatReducer from './store/reducers/chat';
import chatsReducer from './store/reducers/chats';
import userReducer from './store/reducers/user';

import App from './App';
import './index.css';

/**
 * Here also redux store will be implemented
 */
const rootReducer = combineReducers({
    chat: chatReducer,
    chats: chatsReducer,
    user: userReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);