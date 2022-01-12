import React, { ReactElement } from 'react'
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
  } from "react-router-dom"

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('app'));

root.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>
)
