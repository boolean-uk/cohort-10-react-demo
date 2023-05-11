import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"

function AddNote () {

    const [noteText, setNoteText] = useState(``)
    const navigate = useNavigate()
    const params = useParams()

    const handleSubmit = (event) => {
        event.preventDefault()

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
        .then(res => {
            return res.json()
        })
        navigate(`/${params.username}/${params.reponame}`)
    }

    const handleChange = (event) => {
        setNoteText(event.target.value)
    }

    return (
        <>
            <form onSubmit={handleSubmit} >
                <input type="text" name="note" onChange={handleChange} />
                <button>Submit Note</button>
            </form>
        </>
    )
}

export default AddNote