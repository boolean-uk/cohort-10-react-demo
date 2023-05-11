import './Repos.css'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'

const initialFormData = {
  github: 'alexjshaw'
}

function Repos () {
  const [repos, setRepos] = useState([])
  const [username, setUsername] = useState('alexjshaw')
  const [formData, setFormData] = useState(initialFormData)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    // https://api.github.com/users/${username}/repos
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(res => res.json()) // read the response format which is stored in JSON
      .then(data => {
      if (data.message === 'Not Found') {
        setNotFound(true)
      } else {
        setNotFound(false)
        setRepos(data)
      }
    })
  }, [username])

  const handleSubmit = (e) => {
    e.preventDefault()
    setUsername(formData.github)
  }

  const handleChange = (e) => {
    setFormData({...formData, github: e.target.value})
  }

  const testFunction = () => {
    const tempRepos = [
      {"name": "cohort-10-react-demo"},
      {"name": "html-adding-the-rest"}
    ]  
    setRepos(tempRepos)
  }

  return (
    <>
      {
        notFound && <div>user '{username}' does not exist</div>
      }
      <button onClick={testFunction} >TEST</button>
      <form onSubmit={handleSubmit}>
        <input type="text" name="github" onChange={handleChange} value={formData.github}/>
        <button>get repos</button>
      </form>
      {
        repos.map((repo => (
          <div key={repo.name}>
              <Link to={`/${username}/${repo.name}`}>{repo.name}</Link>
          </div>
        )))
      }
    </>
  )
}

export default Repos
