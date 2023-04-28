import './App.css';
import { Message } from './components/Message'
// import Message from './components/Message/Message.js'
import { useState } from 'react';


// i need some state!!!!
// the counter value
function App() {
  const [counter, setCounter] = useState(0)

  const handleClick = () => {
    setCounter(counter + 1)
  }

  return (

    <div className="App">
      <header className="App-header">
        <p>{counter}</p>
        <button onClick={handleClick}>+</button>
      </header>
    </div>

  );
}

export default App
