import { useState } from 'react'

function Dice(props) {
  const dice = props.dice

  const [currentDice, setCurrentDice] = useState(dice)

  const handleClick = () => {
    // update currentDice
    // create an array of 5 items, where each is a random number between 1, 6?
    const newDice = currentDice.map(item => Math.floor(Math.random() * 6 +1 ))
    setCurrentDice(newDice) // new random dice
  }

  return (
    <div>
      {
        currentDice.map(die => <span>{die}</span>)
      }
      <button onClick={handleClick}>roll!</button>
    </div>
  )
}

export default Dice
