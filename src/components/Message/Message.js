import './Message.css'

function Message ({message, handleDelete}) {

  const handleClick = () => {
    handleDelete(message)
  }
  return (
    <div>
      <span>{message.author}: {message.content}</span>
      <button onClick={handleClick}>delete</button>
    </div>
  )
}

export default Message
