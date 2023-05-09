// what state does my app need?
import { useState, useEffect } from 'react'
import { Message } from '../Message'

function MessageBoard () {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/messages')
    .then(res=> res.json())
    .then(data => setMessages(data))
      
    }, [])


  return (
  <>
  <form>
    <input type="text"/>
  </form>
  {
    messages.map((message => (
      <div>
        <span>
          {message.content} by {message.author}
        </span>
      </div>
    )))
  }
  </>
  )
}

export default MessageBoard
