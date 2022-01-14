import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
// import { HashRouter as Router } from "react-router-dom"

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import App from './app'
import rootReducer from './reducers';

const middleware = [thunk, logger];
const store = createStore(
  rootReducer,
  // @ts-ignore
  window.__INITIAL_STATE__,
  applyMiddleware(...middleware)
) || null

// @ts-ignore
delete window.__INITIAL_STATE__
const root = ReactDOM.createRoot(document.getElementById('app'))

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>
)
