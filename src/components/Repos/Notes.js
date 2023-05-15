import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

function Notes () {
  const [query, setQuery] = useState('')
  const [notes, setNotes] = useState([])

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  useEffect(() => {
    const getNotes = async () => {
      const notesRes = await fetch(`http://localhost:4000/notes?contents_like=${query}`)
      const notes = await notesRes.json()
      setNotes(notes)
    }
    getNotes()
  }, [query])


  const sortedNotes = () => {
    return notes.sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))
  }

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
      {
        sortedNotes().map(note => (
          <div>
            {note.contents} at {(new Date(Date.parse(note.timestamp))).toLocaleTimeString()}
            <Link to={`/${note.repoOwner}/${note.repo}`}>{note.repo}</Link>
            <Link to={`/${note.repoOwner}`}>{note.repoOwner}</Link>
          </div>
        ))
      }
    </>
  )
}

export default Notes
