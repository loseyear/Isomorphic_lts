import { lazy, Suspense } from 'react'
import {
  Routes,
  Route,
  Link
} from "react-router-dom"
import { FunctionNamed } from './FunctionNamed';
import routes from './router'
// import FunctionDefault from './FunctionDefault';

const FunctionDefault = lazy(() => import('./FunctionDefault'));
const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/bubblegum">Bubblegum</Link>
        </li>
        <li>
          <Link to="/shoelaces">Shoelaces</Link>
        </li>
      </ul>
      <Routes>
        {
          routes.map(
            (route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.sidebar />}
              />
            )
          )
        }
      </Routes>
      <FunctionNamed />
      <Suspense fallback={<h1>Loading</h1>}>
        <FunctionDefault />
        <LazyComponent />
      </Suspense>
    </div>
  );
}

export default App;
