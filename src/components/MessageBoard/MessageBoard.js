
// what state does my app need?
import { useState, useEffect } from 'react'
import { Message } from '../Message'


function MessageBoard () {

  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [formData, setFormData] = useState({})

useEffect(() => {
  fetch('http://localhost:4000/messagesData')
  .then(res => res.json())
  .then(data =>setMessages(data))
}, [])

//update this handler

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('e.target', e.target)
    console.log('e.target value', e.target.value)

    const newMessage = {
      content: e.target.value,
    }

  const options = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMessage)
    }

    fetch('http://localhost:4000/messagesData', options)
    .then(res => res.json())
    .then(data =>setInputMessage(data))
  }

//update this handler

  // const handleDelete = (message) => {
  //   const newMessages = messages.filter(item => {
  //     if (item !== message) {
  //       return message
  //     }
  //   })
  //   setMessages(newMessages)
  // }

//update this handler

  const handleUpdate = (e) => {
    setFormData({...formData, content: e.target.value})
  }


//check render is pointing to correct functions

  return (
    <div>
      {console.log('messages', messages)}
      {console.log('inputMessage', inputMessage)}
      <form onSubmit={handleSubmit}>
        <label htmlFor="content">
          What's your fave saying?
        </label>
        <input id="content" type="text" name='content' value={formData.content}/>
        <label htmlFor="author">
          Who said it?
        </label>
        <input id="author" type="text" name='author'/>

        <button>share</button>
      </form>
      {
        messages.map((messageObj, index) => {
          return (
            <Message
              key={index}
              message={messageObj}
              // handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          )
        })
      }
    </div>
  )
}

export default MessageBoard
