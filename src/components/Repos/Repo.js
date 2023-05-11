import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"

function Repo () {
  const [repo, setRepo] = useState({})
  const [notFound, setNotFound] = useState(false)
  const [notes, setNotes] = useState([])

  const params = useParams()

  useEffect(() => {
    fetchNotes()
    fetch(`https://api.github.com/repos/${params.username}/${params.reponame}`)
      .then(res => res.json()) // read the response format which is stored in JSON
      .then(data => {
      if (data.message === 'Not Found') {
        setNotFound(true)
      } else {
        setNotFound(false)
        setRepo(data)
      }
    })
  }, [])

  const fetchNotes = () => {
    console.log("reponame", params.reponame)
    fetch(`http://localhost:3001/${params.username}`)
    .then(res => res.json())
    .then(res => {
      if(params.reponame in res) {
        setNotes(res[params.reponame])
      } else {
        console.log('no notes found')
      }
      
    })
    .catch(err => console.log(err))
  }

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
      <button>
        <Link to={'/' + params.username + '/' + repo.name + '/notes/add'}>Add Note</Link>
      </button>
      <ul>
      {
        notes.length === 0 ? (
        <li>No notes found</li>
        ) : (
          notes.map((note, index) => {
            return <li key={index}>{note.content} <Link to={'/' + params.username + '/notes/' + params.id + '/edit'}> Edit </Link> - <Link> Delete </Link></li>

          })
        )
      }
      </ul>
      
    </>
  )
}

export default Repo
