import { useNavigate } from "react-router-dom"
import { useState } from 'react'

const initialFormData = {
  username: 'dearshrewdwit'
}

function Search () {
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
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" onChange={handleChange} value={formData.username}/>
        <button>go</button>
      </form>
    </>
  )
}

export default Search
