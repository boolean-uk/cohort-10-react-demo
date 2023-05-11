import './repo.css'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"

function Repo ({editedNote, setEditedNote}) {
  const [repo, setRepo] = useState({})
  const [notFound, setNotFound] = useState(false)
  const [notes, setNotes] = useState([])

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`https://api.github.com/repos/${params.username}/${params.reponame}`)
      .then(res => res.json())
      .then(data => {
      if (data.message === 'Not Found') {
        setNotFound(true)
      } else {
        setNotFound(false)
        setRepo(data)
      }
    })
  }, [])

  useEffect(() => {
    fetch(`http://localhost:4000/Notes`)
    .then(res => res.json())
    .then(data => {
      setNotes(data)
    })
  }, [])

  const testFunction = () => {
    console.log(notes)
  }

  const testFetch = () => {
    const testRepo = {
      name: "cohort-10-react-demo",
      forks: 0,
      stars: 0,
      visibility: "public"
    }
    setRepo(testRepo)

    fetch(`http://localhost:4000/Notes`)
    .then(res => res.json())
    .then(data => {
      setNotes(data)
    })
  }

  const handleEditButton = (note) => {
    setEditedNote(note)
    navigate(`/${params.username}/notes/${note.id}/edit`)
  }

  const handleAddButton = () => {
    setEditedNote("")
    navigate(`/${params.username}/${repo.name}/notes/add`)
  }

  const handleDelete = (item) => {
    console.log(item)
    console.log(item.id)
    fetch(`http://localhost:4000/Notes/${item.id}`,{
      method: "DELETE"
    })
    .then(() => {
      fetch("http://localhost:4000/Notes")
      .then(res => res.json())
      .then(data => {
        setNotes(data)
        console.log(data)
      })
    })

  };

  const handleBack = () => {
    navigate(`/${params.username}`)
  }


  return (
    <>
      <button onClick={handleBack} >BACK</button>
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
      <button onClick={handleAddButton} >Add Note</button>
      <h2>Notes</h2>
      <div>
        <ul>
          {notes.map(item => {
            if (item.user === params.username && item.repo === repo.name) {
              return <li key={item.id}>{item.note}
              <button onClick={() => handleEditButton(item)} >EDIT</button>
              <button onClick={() => handleDelete(item)} >DELETE</button></li>
            }
          })}
        </ul>
      </div>
    </>
  )
}

export default Repo


