import './Repos.css'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react'

// show all repositories for me on the page by default when i load the page.
// show also a input field where i can type any user's github username
// when i hit the button, i want to see their repositories on the page.

// clicking a repo should navigate to /user/repo-name and show information about the repo
// I should be able to navigate back to the home page showing a list of repositories for the user

const initialFormData = {
  github: ''
}

function Repos () {
  const [repos, setRepos] = useState([])
  const [username, setUsername] = useState('')
  const [formData, setFormData] = useState(initialFormData)
  const [notFound, setNotFound] = useState(false)
  const [owner, setOwner] = useState([])
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    // https://api.github.com/users/${username}/repos
    fetch(`https://api.github.com/users/${params.username}/repos`)
      .then(res => res.json()) // read the response format which is stored in JSON
      .then(data => {
        console.log('this is the data: ', data)
      if (data.message === 'Not Found') {
        setNotFound(true)
      } else {
        setNotFound(false)
        setOwner(data[0].owner)
        setRepos(data)
      }
    })
  }, [params.username])

  const handleSubmit = (e) => {
    e.preventDefault()
    setUsername(formData.github)
    navigate(`/${username}`)
  }

  const handleChange = (e) => {
    setFormData({...formData, github: e.target.value})
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
      <h1>{params.username} ~ iD: {owner.id}</h1>
      <img src={owner.avatar_url} width="200px" style={{borderRadius: '50%'}} alt="avatar"/>

      {
        repos.map(((repo, index) => (
          <div key={index}>
              <Link to={`/${params.username}/${repo.name}`}>{repo.name}</Link>
          </div>
        )))
      }
    </>
  )
}

export default Repos
