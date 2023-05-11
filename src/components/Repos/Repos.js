import './Repos.css'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'

// show all repositories for me on the page by default when i load the page.
// show also a input field where i can type any user's github username
// when i hit the button, i want to see their repositories on the page.

// clicking a repo should navigate to /user/repo-name and show information about the repo
// I should be able to navigate back to the home page showing a list of repositories for the user

const initialFormData = {
  github: 'ManNavic'
}

function Repos ({ username, setUsername, notFound, setNotFound}) {
  const [repos, setRepos] = useState([])
  // const [username, setUsername] = useState('ManNavic')
  const [formData, setFormData] = useState(initialFormData)
  // const [repoData, setRepoData]= useState([])

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(res => res.json()) // read the response format which is stored in JSON
      .then(data => {
      if (data.message === 'Not Found') {
        // setNotFound(true)
      } else {
        // console.log(data)
        // setNotFound(false)
        setRepos(data)
        
      }
    })
  }, [username])

  useEffect(() => {
    handleData()
  }, [repos])

  const handleChange = (e) => {
    setFormData({...formData, github: e.target.value})
  }


  function handleData(){
    const reposList = []
    for (let i = 0; i < repos.length;i++) {
      const reposData = repos[i].name
      // console.log(reposData)
      reposList.push(reposData)
    }
    // setRepoData(reposList)
  }

  return (
    <>
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
