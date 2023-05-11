import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"

function Notes(){
  const [notes, setNotes]= useState([])

  const { username, reponame  } = useParams()
  console.log('username', username)

  useEffect(() => {
    fetch("http://localhost:4000/data")
    .then((res) => res.json())
    .then((json) => setNotes(json))
  }, [])


  // function handleClick(id){

  // }

return(
    <>
      <ul>
      {
        notes.map((el) => {
          console.log(`here`,el.username, el.repo)
       if(el.username === username && el.repo === reponame ) {
      //  return <li>Comment: {el.comment} Author: {el.author}<button onClick={()=>handleClick(el.id)}>Edit</button> </li>
      return <li>Comment: {el.comment} <Link to={`/${username}/notes/${el.id}/edit}`}>edit page</Link>
      </li>

      }
    }
        )
      }
      </ul>
    </>
)
}
export default Notes
