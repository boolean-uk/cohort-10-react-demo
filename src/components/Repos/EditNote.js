import { useParams, useNavigate } from 'react-router-dom'

export default function EditNote({ repo }){
  const {username, id} = useParams()
  const navigate = useNavigate()

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

  return(
      <div>
        <form onSubmit={handleSubmit}>
          <label>Comment
            <input type="text"></input>
            <button>update note</button>
          </label>
        </form>
      </div>
  )
}
