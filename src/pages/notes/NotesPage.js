import { useState, useEffect } from 'react'
import { Notes, Note } from '../../components/Notes'
import { sortDesc } from '../../utils/notes'
import notesClient from '../../utils/client'

function NotesPage () {
  const [query, setQuery] = useState("")
  const [notes, setNotes] = useState([])

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  useEffect(() => {
    const getNotes = async () => {
      const notes = await notesClient.get(`/notes?contents_like=${query}`)
      setNotes(notes)
    }
    getNotes()
  }, [query])

  return (
    <>
      <label htmlFor="query"></label>
      <input
        id="query"
        type="text"
        name="query"
        value={query}
        onChange={handleChange}
        placeholder="search by contents..."
      />

      <Notes notes={sortDesc(notes)} NoteType={Note}/>
    </>
  )
}

export default NotesPage
