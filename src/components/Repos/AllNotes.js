import { useState, useEffect } from 'react'

function AllNotes({notes, setNotes}) {

    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        fetch(`http://localhost:4000/Notes`)
        .then(res => res.json())
        .then(data => {
          setNotes(data)
        })
      }, [setNotes])

      const NoteCard = (notes) => {

        const cardStyle = {
            border: '1px solid black',
            margin: '5px',
            width: '200px',
            textAlign: 'center',
          };        

        return (
            <div style={cardStyle}>
            <div>{notes.user}</div>
            <div>{notes.repo}</div>
            <div>{notes.note}</div>
            </div>
        )
      }

      const handleChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase())
      }
    
    return (
        <>
        <div>
        <form>
            <label>Search Notes:</label>
            <input type='text' name="noteSearch" onChange={handleChange} />
        </form>
        </div>
        <div>
            {notes.map(note => {
                if (searchTerm === "" || note.note.toLowerCase().includes(searchTerm)) {
                    return <NoteCard key={note.id} {...note} />
                }
            })}
        </div>
        </>
    )
}

export default AllNotes