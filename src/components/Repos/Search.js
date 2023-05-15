import './Repos.css'
import {useNavigate} from "react-router-dom";
import { useState} from 'react'

const initialFormData = {
  github: ''
}

function Search () {
  const [formData, setFormData] = useState(initialFormData)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const userName = formData.github
    navigate(`/${userName}`)
  }

  const handleChange = (e) => {
    setFormData({...formData, github: e.target.value})
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="github" onChange={handleChange} value={formData.github}/>
        <button>get repos</button>
      </form>
    </>
  )
}


export default Search
