import { useParams, useNavigate } from "react-router-dom"
import { useState } from 'react'

function NotesForm () {
  const {username, reponame} = useParams()
  const [note, setNote] = useState({contents: '', repo: reponame})
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch(`http://localhost:4000/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...note, timestamp: new Date()})
    })
    navigate(`/${username}/${reponame}`)
  }

  const handleChange = (e) => {
    setNote({...note, contents: e.target.value})
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="contents" value={note.contents} onChange={handleChange}/>
        <button>add note</button>
      </form>
    </>
  )
}

export default NotesForm
