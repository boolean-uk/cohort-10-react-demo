import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"

function AddNote ({editedNote, setEditedNote}) {

    const [noteText, setNoteText] = useState(``)
    const [editing, setEditing] = useState(false)
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (editedNote !== "") {
            setNoteText(editedNote.note)
            setEditing(true)
        }
    },[])

    const handleSubmit = (event) => {
        console.log(`handleSubmit Editing:`, editing)
        event.preventDefault()
        if (editing) {
            const options = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({note: noteText})
            }
            fetch(`http://localhost:4000/Notes/${editedNote.id}`, options)
            .then((res) => res.json)
            .then(() => {
                navigate(`/${params.username}/${editedNote.repo}`)
            })
            .catch((error) => {
                console.error("Error occurred during PATCH request:", error)
            })
        } else {
            const newNote = {
                user: params.username,
                repo: params.reponame,
                note: noteText
            }
    
            const options = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(newNote)
            }
            fetch(`http://localhost:4000/Notes`, options)
            .then((res) => res.json)
            .then(() => {
                navigate(`/${params.username}/${params.reponame}`)
            })
            .catch((error) => {
                console.error("Error occurred during POST request:", error)
            })
        }
    }

    const handleChange = (event) => {
        setNoteText(event.target.value)
        console.log(editing)
    }

    return (
        <>
            <form onSubmit={handleSubmit} >
                <input type="text" name="note" onChange={handleChange} value={noteText} />
                <button>Submit Note</button>
            </form>
        </>
    )
}

export default AddNote