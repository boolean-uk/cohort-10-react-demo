// what state does my app need?
import { useState, useEffect } from 'react'
// import { Message } from '../Message'

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
      content
    }

    const options = {
    method: "POST",
    header: {"Content-Type": "application/json"},
    body: JSON.stringify(newMessage)}
    console.log(newMessage)

    // fetch('http://localhost:3000/messages', options)
    // .then ( res => res.json())
    // .then(data => {setMessages([...messages, data])}) 
    // .catch((err) => console.error(err));


  }

 
    // const options = {
    // method: "POST",
    // header: {"Content-Type": "application/json"},
    // body: JSON.stringify({content: content, author: author})}
    // fetch('http://localhost:3000/messages', options)
    // .then ( res => res.json())
    // .then(data => {setMessages([...messages, data])}) 




  //   function createNewMessage(newMessageItem) {
  //     const newMessage = {
  //       content: newMessageItem,
  //       author: "'Tom K'",
  //       heard: true
  //     }
      
  //     const options = {
  //         method: 'POST',
  //         headers: {
  //             "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify(newTodo)
  //     }
  
  //     fetch('http://localhost:3000/messages', options)
  //         .then(function (response) {
  //         return response.json()
  //         })
  //         .then(function (data) {
  //             state.todos.push(data)
  //             renderTodoList()
  //     })
  
  // }



  return (
  <>
  <form onSubmit={handleSubmit}>
    <input type="text" value={content} onChange={changeContent}/>
    <input type="text" value={author} onChange={changeAuthor}/>
    <input type="submit" value="Submit"/>
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
