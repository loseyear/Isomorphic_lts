import React from 'react';
import {
    Route,
    Link
} from 'react-router-dom';
import Count from './count/count';

const Home = () => (
    <div>Home</div>
);
const HomeList = () => (
    <div>HomeList</div>
);
const HomeItem = () => (
    <div>HomeItem</div>
);
const About = () => (
    <div>About</div>
);
const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
);
const NotFound = () => (
    <div>NotFound</div>
);
const Topics = ({ match }) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>
                    Rendering with React
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>
                    Components
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    Props v. State
                </Link>
            </li>
        </ul>
        <Route path={`${match.url}/:topicId`} component={Topic} />
        <Route
            exact
            path={match.url} render={
            () => (
                <h3>Please select a topic.</h3>
            )}
        />
    </div>
);

const App = () => (
    <div>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/topics">Topics</Link></li>
            <li><Link to="/count">Count</Link></li>
        </ul>
        <Route path="/" exact component={Home} />
        <Route path="/" component={HomeList} />
        <Route path="/" component={HomeItem} />
        <Route path="/about" component={About} />
        <Route path="/count" component={Count} />
        <Route path="/topics" component={Topics} />
        <Route path="*" component={NotFound} />
    </div>
);
export default App;
