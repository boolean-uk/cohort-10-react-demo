import './Repos.css'
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'

function Repos ({repos, setRepos, username, setUsername, formData, setFormData, notFound, setNotFound}) {

  const navigate = useNavigate()
  const [userData, setUserData] = useState([])

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
  }, [username, setNotFound, setRepos])

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
    .then (res => res.json())
    .then (data => setUserData(data))
  }, [username])

  const Card = () => {
    return (
      <>
      <img src={userData.avatar_url} alt="User Avatar" width={100} />
      <div>{userData.name}</div>
      <div>{userData.company}</div>
      </>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setUsername(formData.github)
    navigate(`/${formData.github}`)
  }

const handleChange = (e) => {
    setFormData({...formData, github: e.target.value})
    console.log(userData.name)
    console.log(userData.company)
  }

  return (
    <>
      {
        notFound && <div>user '{username}' does not exist</div>
      }
      <form onSubmit={handleSubmit}>
        <input type="text" name="github" onChange={handleChange} value={formData.github}/>
        <button>get repos</button>
      </form>
      <Card />
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
