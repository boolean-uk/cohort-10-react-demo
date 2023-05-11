import './Repos.css'
import { Link, useLocation, useHistory } from "react-router-dom";
import { useState, useEffect } from 'react'

const initialFormData = {
  github: ''
}

function Repos() {
  const [repos, setRepos] = useState([])
  const [username, setUsername] = useState('')
  const [formData, setFormData] = useState(initialFormData)
  const [notFound, setNotFound] = useState(false)

  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    const { state } = location
    if (state && state.lastSubmittedUsername) {
      setUsername(state.lastSubmittedUsername)
      setFormData({ github: state.lastSubmittedUsername })
    }
  }, [location])

  useEffect(() => {
    if (username) {
      fetch(`https://api.github.com/users/${username}/repos`)
        .then(res => res.json())
        .then(data => {
          if (data.message === 'Not Found') {
            setNotFound(true)
          } else {
            setNotFound(false)
            setRepos(data)
          }
        })
    }
  }, [username])

  const handleSubmit = (e) => {
    e.preventDefault()
    const { github } = formData
    setUsername(github)
    history.push(location.pathname, { lastSubmittedUsername: github })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, github: e.target.value })
  }

  return (
    <>
      {notFound && <div>user '{username}' does not exist</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="github" onChange={handleChange} value={formData.github} />
        <button>get repos</button>
      </form>
      {repos.length > 0 && (
        <>
          {repos.map((repo) => (
            <div key={repo.name}>
              <Link to={`/${username}/${repo.name}`}>{repo.name}</Link>
            </div>
          ))}
        </>
      )}
    </>
  )
}

export default Repos
