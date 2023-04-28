import './App.css';
// import { Message } from './components/Message'
// import { Counter } from './components/Counter'
import { Dice } from './components/Dice'
// what state?
const initialDice = [1,1,1,1,1]

function App() {

  return (

    <div className="App">
      <header className="App-header">
        <Dice dice={initialDice}/>
      </header>
    </div>

  );
}

export default App
