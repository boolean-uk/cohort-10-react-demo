import { useState } from 'react';

function Counter() {
  const [counter, setCounter] = useState(0)

  const handleClick = () => {
    setCounter(counter + 1)
  }

  return (
    <>
      <p>{counter}</p>
      <button onClick={handleClick}>+</button>
    </>
  );
}

export default Counter
