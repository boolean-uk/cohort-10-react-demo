import { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"

function Repo () {
  const [repo, setRepo] = useState({notes: []})
  const [notFound, setNotFound] = useState(false)

  const {username, reponame} = useParams()

  useEffect(() => {
    const getRepoAndNotes = async () => {
      const ghRes = await fetch(`https://api.github.com/repos/${username}/${reponame}`)
      const ghData = await ghRes.json()
      if (ghData.message === 'Not Found') {
        setNotFound(true)
      } else {
        setNotFound(false)
        const notesRes = await fetch(`http://localhost:4000/notes?repo=${ghData.name}`)
        const notes = await notesRes.json()
        setRepo({...ghData, notes})
      }
    }

    getRepoAndNotes()
  }, [username, reponame])

  const sortedNotes = () => {
    return repo.notes.sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))
  }
  
  return (
    <>
      {
        notFound ? (
          <div>repo '{reponame}' of user '{username}' does not exist</div>
        ) : (
          <>
            <div>
              <ul>
                <li>name: {repo.name}</li>
                <li>forks: {repo.forks}</li>
                <li>stars: {repo.stargazers_count}</li>
                <li>visibility: {repo.visibility}</li>
              </ul>
            </div>
            <h2>Notes</h2>
            <Link to={`/${username}/${reponame}/notes/add`}>add note</Link>
            {
              sortedNotes().map(note => (
                <div>
                  {note.contents} at {(new Date(Date.parse(note.timestamp))).toLocaleTimeString()}
                </div>
              ))
            }
          </>
        )
      }

    </>
  )
}

export default Repo
