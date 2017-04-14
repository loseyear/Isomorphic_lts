import React from 'react';
import { Link, Route } from 'react-router-dom';

import Count from './count/count.jsx';

const Home = () => (
    <div>Home</div>
);

const About = () => (
    <div>About</div>
);
const NotFound = () => (
    <div>NotFound</div>
);

const App = () => (
    <div>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/count">Count</Link></li>
        </ul>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/count" component={Count} />
        <Route path="*" component={NotFound} />
    </div>
);

export default App;
