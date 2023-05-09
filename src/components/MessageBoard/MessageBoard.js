
// what state does my app need?
import { useState, useEffect } from 'react'
import { Message } from '../Message'


function MessageBoard () {

  const [messages, setMessages] = useState([])

useEffect(() => {
  fetch('http://localhost:4000/messagesData')
  .then(res => res.json())
  .then(data =>setMessages(data))
}, [])

//update this handler

  const handleSubmit = (e) => {
    e.preventDefault()

    const content = e.target[0].value
    const author = e.target[1].value

    const newMessage = {
      content,
      author,
      heard: false
    }

    console.log(newMessage)
    setMessages([...messages, newMessage])
  }

//update this handler

  const handleDelete = (message) => {
    const newMessages = messages.filter(item => {
      if (item !== message) {
        return message
      }
    })
    setMessages(newMessages)
  }

//update this handler

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
  }

//check render is pointing to correct functions

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
