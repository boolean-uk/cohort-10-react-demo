import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'

function NotesEditForm() {
  const { username, noteId } = useParams()
  const [note, setNote] = useState({contents: '', repo: ''})
  const navigate = useNavigate()

  useEffect(() => {
    const getNote = async () => {
      const res = await fetch(`http://localhost:4000/notes/${noteId}`)
      const data = await res.json()
      setNote(data)
    }
    getNote()
  }, [noteId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch(`http://localhost:4000/notes/${note.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
    navigate(`/${username}/${note.repo}`)
  }

  const handleChange = (e) => {
    setNote({...note, contents: e.target.value})
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="contents" value={note.contents} onChange={handleChange}/>
        <button>update note</button>
      </form>
    </>
  )
}

export default NotesEditForm
