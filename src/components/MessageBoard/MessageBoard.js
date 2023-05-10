// what state does my app need?
import { useState, useEffect } from 'react'
import { Message } from '../Message'

function MessageBoard () {
  const [messages, setMessages] = useState([])
  const [content, setContent] = useState()
  const [author, setAuthor] = useState()
 
  useEffect(() => {
    fetch('http://localhost:3000/messages')
    .then(res=> res.json())
    .then(data => setMessages(data))
      
    }, [])

  const changeContent = (e) => {
    setContent(e.target.value)
  }

  const changeAuthor = (e) => {
    setAuthor(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({author, content})
   
    const newMessage = {
      author,
      content,
      heard: false,
      id: Math.random()
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMessage)
    };

    console.log('new object', newMessage)

    fetch('http://localhost:3000/messages', options)
    .then(function (response) {
      return response.json()
    })
    setMessages([...messages, newMessage])
  }



  const handleDelete = (message, id) => {
    console.log('on delete', message)
    // filter
    const newMessages = messages.filter(item => {
      if (item !== message) {
        return message
      }
    })
    setMessages(newMessages) 
    const options = {
      method: "DELETE"
  
    };
    fetch(`http://localhost:3000/messages/${message.id}`, options)
    .then(res => res.text()) // or res.json()
    .then(res => console.log(res))
   
  }

  const handleUpdate = (message, value) => {
console.log(message, value)
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
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify( {heard: value})
    };
    fetch(`http://localhost:3000/messages/${message.id}`, options)
    .then(res => res.text()) // or res.json()
    .then(res => console.log(res))
    setMessages(newMessages)
  }

  return (
    <div>
    {console.log(messages)}
    <form onSubmit={handleSubmit}>
      <label htmlFor="content">
        What's your fave saying?
      </label>
      <input id="content" type="text" value={content} onChange={changeContent}/>
      <label htmlFor="author">
        Who said it?
      </label>
      <input id="author" type="text" value={author} onChange={changeAuthor}/>

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
