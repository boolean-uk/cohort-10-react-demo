import { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"

function Repo () {
  const [repo, setRepo] = useState({})
  const [notFound, setNotFound] = useState(false)
  const [noteList, setNoteList] = useState([])

  const params = useParams()
  // console.log(params)

  useEffect(() => {
    //  https://api.github.com/repos/OWNER/REPO
    fetch(`https://api.github.com/repos/${params.username}/${params.reponame}`)
      .then(res => res.json()) // read the response format which is stored in JSON
      .then(data => {
      if (data.message === 'Not Found') {
        setNotFound(true)
      } else {
        // console.log(data)
        setNotFound(false)
        setRepo(data)
      }
    })
  }, [])
  
  useEffect(() => {    
    fetch("http://localhost:4000/Note")
    .then(res => res.json())
    .then(data => {

      const array = []
      for (let i = data.length - 1; i > -1; i--) {
        if (data[i].repo === params.reponame) {
          array.push(data[i])
        }
      }
      setNoteList(array)
    })
  }, [])

  // console.log('note', noteList)

  return (
    <>
      {
        notFound ? (
          <div>repo '{params.reponame}' of user '{params.username}' does not exist</div>
        ) : (
          <div>
            <ul>
              <li>name: {repo.name}</li>
              <li>forks: {repo.forks}</li>
              <li>stars: {repo.stargazers_count}</li>
              <li>visibility: {repo.visibility}</li>
            </ul>
          </div>
        )
      }
      <Link to={`/${params.username}/${params.reponame}/notes/add`}>
        <button>Add note</button>
      </Link>
      <h1>Notes</h1>
      <div>
        <ul>
          { noteList.map(item => {
          return <li>{item.note}</li>})}
        </ul>
      </div>
    </>
  )
}

export default Repo
