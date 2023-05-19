import { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"
import { Notes, RepoNote } from '../components/Notes'
import { Repo } from '../components/Repos'

import notesClient from './../utils/client'
import { sortDesc } from './../utils/notes'


function RepoPage () {
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
        const notes = await notesClient.get(`/notes?repo=${ghData.name}`)
        setRepo({...ghData, notes})
      }
    }

    getRepoAndNotes()
  }, [username, reponame])

  const deleteNote = async (id) => {
    await notesClient.delete(`/notes/${id}`)
    const notes = repo.notes.filter(item => item.id !== id)
    setRepo({...repo, notes})
  }

  return (
    <>
      <Link to={`/${username}`}>{username}</Link>
      {
        notFound ? (
          <div>repo '{reponame}' of user '{username}' does not exist</div>
        ) : (
          <>
            <Repo repo={repo} />
            <h2>Notes</h2>
            <Link to={`/${username}/${reponame}/notes/add`}>add note</Link>
            <Notes notes={sortDesc(repo.notes)} NoteType={RepoNote} deleteNote={deleteNote}/>
          </>
        )
      }

    </>
  )
}

export default RepoPage
