// what state does my app need?
import { useState } from 'react'
import { Message } from '../Message'

const initialMessages = [
  "'No', says Tom Kennedy",
  "Good Morning, Good Afternoon, Good Evening, Good Night!"
]

function MessageBoard () {

  const [messages, setMessages] = useState(initialMessages)

  // given i type some text in the input field
  // when i click on the button
  // then i should see the text display in the list

  // probably need an event listener for the submit event
  // some func to run when it triggers
  // then when it triggers => UPDATE STATE!!!

  const handleSubmit = (e) => {
    e.preventDefault()
    const newMessage = e.target[0].value

    // COPY THE ARRAY
    // const newMessages = messages.map(message => message)
    // messages.push(newMessage) // NO NO NOPE, NEIN, RARA
    // newMessages.push(newMessage) //yes, yes, yes, yes
    // const newMessages = [...messages, newMessage]
    setMessages([...messages, newMessage])
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          What's your fave saying?
          <input type="text"/>
        </label>
        <button>share</button>
      </form>
      {
        messages.map((message, index) => <Message key={index} content={message}/>)
      }
    </div>
  )
}

export default MessageBoard
