import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate} from "react-router-dom"



// 2. When a user clicks to edit a note, then the url should change to ‘/dearshrewdwit/notes/12/edit’ and show a text input field populated with the current note text and a button to update the note. When the note is updated, the app should navigate back to the repo page and the user should see all the notes including the newly updated one.

function Repo () {
  const [repo, setRepo] = useState({})
  const [notFound, setNotFound] = useState(false)
  const [state, setState] = useState([])

  const params = useParams()
  const navigate = useNavigate()
  console.log(params)

  useEffect(() => {
    //  https://api.github.com/repos/OWNER/REPO
    fetch(`https://api.github.com/repos/${params.username}/${params.reponame}`)
      .then(res => res.json()) // read the response format which is stored in JSON
      .then(data => {
      if (data.message === 'Not Found') {
        setNotFound(true)
      } else {
        console.log(data)
        setNotFound(false)
        setRepo(data)
      }
    })
  }, [params.username, params.reponame])

  useEffect(() => {
    fetch("http://localhost:4000/notes")
    .then(response => response.json())
    .then(data => {
      setState(data)
    })
  }, [])



  
 const notes = state.filter((object) => 
  object.reponame === repo.name
).sort((obj1,obj2) => obj2.id - obj1.id)

console.log(notes)

const handleEdit = (object) => {
  
  navigate(`/${object.username}/${object.note}/${object.id}/edit`)
}

const handleDelete = (object) => {

  const newNotes = state.filter(item => {
    if (item !== object) {
      return object
    }
  })

  const options = {
    method: "DELETE"
  }

  fetch(`http://localhost:4000/notes/${object.id}`, options)
  .then(response => response.json())

  setState(newNotes)
  

}
  
  return (
    <>
      {
        notFound ? (
          <div>repo '{params.reponame}' of user '{params.username}' does not exist</div>
        ) : (
          
          <>

          <div>
            <Link to = {`/${params.username}`}> Back</Link>
          </div>

            <div>
              <ul>
                <li>name: {repo.name}</li>
                <li>forks: {repo.forks}</li>
                <li>stars: {repo.stargazers_count}</li>
                <li>visibility: {repo.visibility}</li>
              </ul>
            </div>
            

          {/* - A clickable element to add a note */}

          {/* When a user clicks to add a note, then the url should change to ‘/dearshrewdwit/bowling-challenge/notes/add’ and show a text input field and a button to add the note.  */}

          {
            <Link to = {`/${params.username}/${params.reponame}/notes/add`}>Add a Note</Link>
        
          }

          {/* - All current notes listed down the page in reverse chronological order (most recent at the top) for the repository */}

          {notes.map((object, index) => {
            return (
              
              <ul>
                <li key = {index}>
                  {object.note}
                  <button onClick={()=> handleEdit(object)}>Edit Note</button>
                  <button onClick={() => handleDelete(object)}>Delete Note</button>
                </li>
              </ul>
             
            )

          })}


          </>
        )
      }
    </>
  )
}

export default Repo
