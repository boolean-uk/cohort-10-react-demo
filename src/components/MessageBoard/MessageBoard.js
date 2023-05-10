
// what state does my app need?
import { useState, useEffect } from 'react'
import { Message } from '../Message'


function MessageBoard () {

  const [messages, setMessages] = useState([])
  const [content, setContent] = useState()
  const [author, setAuthor] = useState()

useEffect(() => {
  fetch('http://localhost:4000/messagesData')
  .then(res => res.json())
  .then((json) =>setMessages(json))
}, [])

//update this handler

const changeContent = (e) => {
  setContent(e.target.value)
}
const changeAuthor = (e) => {
  setAuthor(e.target.value)
}

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('content', content)
    console.log('author', author)

    const newMessage = {
      content,
      author,
      heard: false,
      id: Math.random()
    }

  const options = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMessage)
    }

    fetch('http://localhost:4000/messagesData', options)
    .then(function (response) {
      return response.json()
    })
    setMessages([...messages, newMessage])
  }

// update this handler

  const handleDelete = (message) => {
    const newMessages = messages.filter(item => {
      if (item !== message) {
        return message
      }
    })
    setMessages(newMessages)
    const opts = {
      method: 'DELETE'
    }
    fetch(`http://localhost:4000/messagesData/${message.id}`, opts)
    .then(res => res.text())
    }


//update this handler

  const handleUpdate = (message,value) => {
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
    const opts = {
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({heard:value})
    }
    fetch(`http://localhost:4000/messagesData/${message.id}`, opts)
    .then(res => res.text())
    setMessages(newMessages)
  }


//check render is pointing to correct functions

  return (
    <div>
      {console.log('messages', messages)}
      <form onSubmit={handleSubmit}>
        <label htmlFor="content">
          What's your fave saying?
        </label>
        <input id="content" type="text" name='content' onChange={changeContent} value={content}/>
        <label htmlFor="author">
          Who said it?
        </label>
        <input id="author" type="text" name='author' onChange={changeAuthor} value={author}/>

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
