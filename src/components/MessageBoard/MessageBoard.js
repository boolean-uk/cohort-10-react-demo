import { useState, useEffect } from 'react'
import Message from '../Message'

function MessageBoard() {

  const [messages, setMessages] = useState([])
  const url = 'http://localhost:3001'
  
  useEffect(() => {
    fetch(`${url}/messages`)
    .then(res => res.json())
    .then(data => {
      console.log('useEffect')
      setMessages(data)
    })
  }, [])

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
    const options = {
      method: 'POST',
      body: {
        "id": "",
        "content": content,
        "author": author,
        "heard": false
      }
    };
    
    fetch('http://localhost:3001/messages', options)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setMessages([...messages, response])
      })
      .catch(err => console.error(err));
  }

  const handleDelete = (message) => {
    const options = {
      method: "DELETE"
    }
    fetch(`${url}/messages/${message.id}`, options)
    .then(response => response.json())
    .then(response => {
      const newMessages = messages.filter(currentMessage => {
        if(currentMessage !== message) {
          return currentMessage
        }
      })
      console.log(newMessages)
      setMessages(newMessages)
    }) 
  }

  const handleUpdate = (message, checked) => {
    const options = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: `{"heard":${checked}}`
    };
    
    fetch(`http://localhost:3001/messages/${message.id}`, options)
      .then(response => response.json())
      .then(response => {
        const newMessages = messages.map(currentMessage => {
          if(currentMessage !== message) {
            return currentMessage
          } else {
            return response
          }
        })
    
        setMessages(newMessages)
      })
      .catch(err => console.error(err));
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