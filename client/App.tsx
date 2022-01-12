import { lazy, Suspense } from 'react';
import { FunctionNamed } from './FunctionNamed';


// import FunctionDefault from './FunctionDefault';

const FunctionDefault = lazy(() => import('./FunctionDefault'));
const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <div>
      <FunctionNamed />
      <Suspense fallback={<h1>Loading</h1>}>
        <FunctionDefault />
        <LazyComponent />
      </Suspense>
    </div>
  );
}

export default App;
