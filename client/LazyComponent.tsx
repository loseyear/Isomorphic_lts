import { useState } from 'react'

function LazyComponent() {
  const [c, sc] = useState(0)
  return (
    <>
      <h1 onClick={() => sc(c + 1)}>Lazy Component {c}</h1>
    </>
  );
}

export default LazyComponent;
