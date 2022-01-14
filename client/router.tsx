import { lazy, Suspense } from 'react'

import { FunctionNamed } from './components/FunctionNamed'

import FunctionDefault from './components/FunctionDefault'
// import  LazyComponent from './LazyComponent'

const FunctionDefaultHome = lazy(() => import('./components/FunctionDefault'));
const LazyComponent = lazy(() => import('./components/LazyComponent'));

// element: () => void 服务端不会预加载数据

export default [
  {
    path: "/",
    exact: true,
    sidebar: 'home!',
    element: () => (
      <Suspense fallback={<h1>Loading</h1>}>
        <FunctionDefaultHome />
      </Suspense>
    )
  },
  {
    path: "/error",
    exact: true,
    sidebar: 'error',
    element: () => <h2>errorerrorerrorerrorerror</h2>
  },
  {
    path: "/FunctionNamed",
    exact: false,
    sidebar: 'FunctionNamed',
    element: FunctionNamed,
  },
  {
    path: "/FunctionDefault",
    exact: false,
    sidebar: 'FunctionDefault',
    element: FunctionDefault,
  },
  {
    path: "/LazyComponent",
    exact: false,
    sidebar: 'LazyComponent',
    element: () => (
      <Suspense fallback={<h1>Loading</h1>}>
        <LazyComponent />
      </Suspense>
    )
  },
]