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

function Search ({repos, setRepos, username, setUsername, notFound, setNotFound}) {
  const [formData, setFormData] = useState(initialFormData)
  const [repoData, setRepoData]= useState([])
  const navigate = useNavigate()
  const urlParams = useParams()

  useEffect(() => {
    // handleData()
  }, [repos])

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log('repos', repos, '\n', 'repoData', repoData)
    const userName = formData.github
    setUsername(userName)
    // if the username key doesn't exist inside of db.json, create it and 
    // give it a value of an object, which has keys for each repo name and 
    // values (for those keys) of an empty array
    // if (!repos.hasOwnProperty(userName)) {
    //   repos[userName] = {}
    // // repoData
    //
    // }
    navigate(`/${userName}`)
  }

  const handleChange = (e) => {
    setFormData({...formData, github: e.target.value})
    console.log(formData)
  }


//   function handleData(){
//     const reposList = []
//     for (let i = 0; i < repos.length;i++) {
//       const reposData = repos[i].name
//       // console.log(reposData)
//       reposList.push(reposData)
//     }
//     setRepoData(reposList)
//   }

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
