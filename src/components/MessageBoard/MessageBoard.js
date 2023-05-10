// what state does my app need?
import { Message } from '../Message'
import { useState, useEffect } from 'react'

function MessageBoard () {

  const [messages, setMessages] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/data")
    .then((res) => res.json())
    .then((json) => setMessages(json))
  }, [])


  function addNewMessage(e) {
  }


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

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMessage)
    }

    fetch('http://localhost:4000/data', options).then(function(response) {
      return response.json()
    })

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
          const options = {
            method: "DELETE"
      }
      fetch(`http://localhost:4000/data/${message.id}`, options) .then(response => {
          return response.json()
        })
          return message
      }
    })
    setMessages(newMessages) // the new array (without the one i'm deleting)
}

  const handleUpdate = (message, value) => {
    const newMessages = messages.map(item => {
      if (item === message) {
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({...message, heard: !message.heard})
        }

        fetch(`http://localhost:4000/data/${message.id}`, options).then(response => {
          return response.json()
        })
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
