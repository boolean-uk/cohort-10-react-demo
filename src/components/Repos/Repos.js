import './Repos.css'
import { Link, useParams } from "react-router-dom";
import { useState, useEffect} from 'react'

// show all repositories for me on the page by default when i load the page.
// show also a input field where i can type any user's github username
// when i hit the button, i want to see their repositories on the page.

// clicking a repo should navigate to /user/repo-name and show information about the repo
// I should be able to navigate back to the home page showing a list of repositories for the user



function Repos () {
  const params = useParams()
  console.log(params)
  const [repos, setRepos] = useState([])
  const [username, setUsername] = useState(params.username)
  const [formData, setFormData] = useState({
    github: params.username
  })
  const [notFound, setNotFound] = useState(false)
  const [imgLink, setImg] = useState('')


  console.log('username', username)
  console.log('formdata', formData)
  

  
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

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
    .then(response => response.json())
    .then(data => {
      setImg(data.avatar_url)
    })
    
  }, [username])




  const handleSubmit = (e) => {
    e.preventDefault()
    setUsername(formData.github)
    
  }

  const handleChange = (e) => {
    setFormData({...formData, github: e.target.value})
  }

  return (
    <>
      <div>

        <Link to={'/notes'}>View Notes</Link>
      </div>
      
      {
        notFound && <div>user '{username}' does not exist</div>
      }
      <form onSubmit={handleSubmit}>
        <input type="text" name="github" onChange={handleChange} value={formData.github}/>
        <button>get repos</button>
      </form>
      {
        <img alt='useravatar' src={imgLink} height={200} />
      }
      {
        repos.map((repo => (
          <div>
              <Link to={`/${username}/${repo.name}`}>{repo.name}</Link>
          </div>
        )))
      }
    </>
  )
}

export default Repos
