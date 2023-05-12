import { useParams, useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'

export default function EditNote({ repo }){
  const [note, setNote] = useState('')
  const {username, id} = useParams()
  const navigate = useNavigate()

    useEffect(() => {
    const getNote = async () => {
      const res = await fetch(`http://localhost:4000/data/${id}`)
      const data = await res.json()
      setNote(data)
    }
    getNote()
    }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedNote = e.target[0].value

    let updatedComment = {
      "comment": updatedNote,
      "username": username,
      "repo": repo.name
    }

    const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedComment)
    }

    console.log(id)

    fetch(`http://localhost:4000/data/${id}`, options) 
    .then(response => {
      return response.json()
    })
    navigate(`/${username}/${repo.name}`)
  }

  const handleChange = (e) => {
    setNote(e.target.value)
  }

  return(
      <div>
        <form onSubmit={handleSubmit}>
          <label>Comment
            <input type="text" value={note.comment} onChange={handleChange}></input>
            <button>update note</button>
          </label>
        </form>
      </div>
  )
}
