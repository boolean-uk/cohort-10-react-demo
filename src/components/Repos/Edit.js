import { useParams, Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

export default function Edit () {
    const params = useParams()
    const [editedNote, setEditedNote] = useState('')
    const [repo, setRepo] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:4000/Note/${params.id}`)
            .then(res => res.json())
            .then(data => {
                console.log('new data', data.repo)
                setRepo(data.repo)
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:4000/Note/${params.id}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ note: editedNote })
        })
        navigate(`/${params.username}/${repo}`)
    }
    
    const handleChange = (e) => {
        setEditedNote(e.target.value)
    }
    
    return (
        <>
        
        <Link to={`/${params.username}/${repo}`}>----Back to Repo</Link>
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange}/>
            <input type="submit" value="Update note" />
        </form>
    </>
    )
}

