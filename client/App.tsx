import { lazy, Suspense } from 'react'
import {
  Routes,
  Route,
  Link
} from "react-router-dom"

import routes from './router'

function App() {
  return (
    <>
      <ul>
        {
          routes.map(
            (route, index) => (
              <li key={index}>
                <Link to={route.path}>{route.sidebar}</Link>
              </li>
            )
          )
        }
      </ul>
      <Routes>
        {
          routes.map(
            (route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.element />}
              />
            )
          )
        }
      </Routes>
    </>
  );
}

export default App;
