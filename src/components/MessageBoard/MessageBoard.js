// what state does my app need?
import { useState } from 'react'
import { Message } from '../Message'

const initialMessages = [
  {
    content: "'No', says Tom Kennedy",
    author: 'Tom K',
    heard: true
  },
  {
    content: "Good Morning, Good Afternoon, Good Evening, Good Night!",
    author: 'Hamza AK',
    heard: false
  }
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
    // target is the element that triggers the event
    const content = e.target[0].value
    const author = e.target[1].value

    const newMessage = {
      content,
      author,
      heard: false
    }

    console.log(newMessage)
    // COPY THE ARRAY
    // const newMessages = messages.map(message => message)
    // messages.push(newMessage) // NO NO NOPE, NEIN, RARA
    // newMessages.push(newMessage) //yes, yes, yes, yes
    // const newMessages = [...messages, newMessage]
    setMessages([...messages, newMessage])
  }

  const handleDelete = (message) => {
    // filter
    const newMessages = messages.filter(item => {
      if (item !== message) {
        return message
      }
    })
    setMessages(newMessages) // the new array (without the one i'm deleting)
  }

  const handleUpdate = (message, value) => {

    const newMessages = messages.map(item => {
      if (item === message) {
        return {
          ...item,
          heard: value
        }
      } else {
        return item
      }
    })

    setMessages(newMessages)
    // const messageToUpdate = messages.find(item => item === message)
    // const updatedMessage = {
    //   ...messageToUpdate,
    //   heard: value
    // }
    // const filteredMessages = messages.filter(item => item !== message)
    // // const newMessages =
    // filteredMessages.push(updatedMessage) // inserts at the end
    //
    // setMessages(filteredMessages)
  }


  return (
    <div>
      {console.log(messages)}
      <form onSubmit={handleSubmit}>
        <label htmlFor="content">
          What's your fave saying?
        </label>
        <input id="content" type="text"/>
        <label htmlFor="author">
          Who said it?
        </label>
        <input id="author" type="text"/>

        <button>share</button>
      </form>
      {
        messages.map((messageObj, index) => {
          return (
            <Message
              key={index}
              message={messageObj}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          )
        })
      }
    </div>
  )
}

export default MessageBoard
