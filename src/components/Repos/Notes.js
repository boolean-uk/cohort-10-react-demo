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

return(
    <>
      <ul>
      {
        // notes.map((el) => <li>Comment: {el.commentInput} Author: {el.authorInput}</li>)
      }
      </ul>
    </>
)
}
export default Notes
