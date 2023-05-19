import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import { UserProfile } from '../components/UserProfile'
import { Repos } from '../components/Repos'

function UserPage () {
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

      <UserProfile
        username={username}
        user={user}
      />
      <Repos
        username={username}
        repos={repos}
      />
    </>
  )
}

export default UserPage
