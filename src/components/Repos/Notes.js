import { useState } from "react"
import { useParams, Link } from "react-router-dom"


function Notes () {
    const [note, setNote] = useState('')

    const params = useParams()

    function handleSubmit(e) {
        e.preventDefault()
        const newNote = {
            user: params.username,
            repo: params.reponame,
            note: note
        }
        console.log(newNote)

        const options = {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newNote)
        }

        fetch("http://localhost:4000/Note", options)
        .then(function (response) {
            console.log('response returned...', response)
            return response.json()
        })
        e.target.reset()
    }

    function handleChange(e) {
        setNote(e.target.value)
        console.log(note)
    }

    return (
        <>
            <Link to={`/${params.username}/${params.reponame}`}>----Back to Repo</Link>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange}/>
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}

export default Notes