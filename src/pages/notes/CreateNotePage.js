import { useParams, useNavigate } from "react-router-dom"
import { useState } from 'react'
import { Form } from '../../components/Form'
import notesClient from '../../utils/client'

function CreateNotePage () {
  const {username, reponame} = useParams()
  const [note, setNote] = useState({
    contents: '',
    repo: reponame,
    repoOwner: username
  })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await notesClient.post('/notes', {...note, timestamp: new Date()})
    navigate(`/${username}/${reponame}`)
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
      buttonText={"add note"}
    />
  )
}

export default CreateNotePage
