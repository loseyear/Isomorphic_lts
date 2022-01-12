import { useState } from 'react'

export function FunctionNamed() {
  const [c, sc] = useState(0)
  return <h1 onClick={() => sc(c + 1)}>Lazy Component {c}</h1>;
}
