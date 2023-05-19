import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import { Form } from '../../components/Form'
import notesClient from '../../utils/client'

function NotesEditForm() {
  const { username, noteId } = useParams()
  const [note, setNote] = useState({contents: '', repo: ''})
  const navigate = useNavigate()

  useEffect(() => {
    const getNote = async () => {
      const data = await notesClient.get(`/notes/${noteId}`)
      setNote(data)
    }
    getNote()
  }, [noteId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await notesClient.patch(`/notes/${note.id}`, note)
    navigate(`/${username}/${note.repo}`)
  }

  const handleChange = (e) => {
    setNote({...note, contents: e.target.value})
  }

  return (
    <Form
      handleSubmit={handleSubmit}
      inputName={"contents"}
      handleChange={handleChange}
      value={note.contents}
      buttonText={"update note"}
    />
  )
}

export default NotesEditForm
