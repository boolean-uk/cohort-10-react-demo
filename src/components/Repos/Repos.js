import './Repos.css'
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react'

function Repos () {
  const [repos, setRepos] = useState([])
  const [user, setUser] = useState({})
  const [notFound, setNotFound] = useState(false)
  const { username } = useParams()

  useEffect(() => {
    const getUserAndRepos = async () => {
      const res = await fetch(`https://api.github.com/users/${username}`)
      const data = await res.json()
      if (data.message === 'Not Found') {
        setNotFound(true)
      } else {
        setNotFound(false)
        setUser(data)
        const res2 = await fetch(`https://api.github.com/users/${username}/repos`)
        const data2 = await res2.json()
        setRepos(data2)
      }
    }
    getUserAndRepos()
  }, [username])

  return (
    <>
      {
        notFound && <div>user '{username}' does not exist</div>
      }

      <h1>{username}</h1>
      <img width="200" src={`${user.avatar_url}`} alt="user avatar"/>

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
