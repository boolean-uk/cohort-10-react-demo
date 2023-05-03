import './Message.css'

const heardStyles = {
  textDecoration: 'line-through',
  color: 'green'
}

function Message ({message, handleDelete, handleUpdate}) {

  const handleClick = () => {
    handleDelete(message)
  }

  const handleChange = (e) => {
    // know whether the checkbox is checked or not
    handleUpdate(message, e.target.checked)
    // handle this event
  }

  return (
    <div>
      <span style={message.heard ? heardStyles : {}}>
        {message.author}: {message.content}
      </span>
      {
        message.author === 'Hamza AK' && <span>🔥</span>
      }
      <input type="checkbox" onChange={handleChange} checked={message.heard}/>
      <button onClick={handleClick}>delete</button>
    </div>
  )
}

export default Message
