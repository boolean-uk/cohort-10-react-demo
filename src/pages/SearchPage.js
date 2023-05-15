import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import { Form } from '../components/Repos'

const initialFormData = {
  username: 'dearshrewdwit'
}

function SearchPage () {
  const [formData, setFormData] = useState(initialFormData)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/${formData.username}`)
  }

  const handleChange = (e) => {
    setFormData({...formData, username: e.target.value})
  }

  return (
    <>
      <h1>Search for a GitHub user</h1>
      <Form
        handleSubmit={handleSubmit}
        inputName={"username"}
        handleChange={handleChange}
        value={formData.username}
        buttonText={"go"}
      />
    </>
  )
}

export default SearchPage
