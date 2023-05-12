import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"

function Notes(){
  const [notes, setNotes]= useState([])

  const { username, reponame  } = useParams()
  console.log('username', username)


  const getNotes = () => {
    fetch("http://localhost:4000/data")
    .then((res) => res.json())
    .then((json) => setNotes(json))
  }

  useEffect(() => {
    getNotes()
  }, [])

  const deleteComment = (id) => {
    // When deleting a comment, and refreshing the page
    const options = {
      method: "DELETE"
    }

    fetch(`http://localhost:4000/data/${id}`, options) 
    .then(response => {
      return response.json()
    })
    .then(() => {
        getNotes()
      })
  }


  return(
      <>
        <ul>
        {
          notes.slice(0).reverse().map((el) => {
              console.log(`here`,el.username, el.repo)
              if(el.username === username && el.repo === reponame ) {
                return <li>Comment: {el.comment} <Link to={`/${username}/notes/${el.id}/edit`}>edit page</Link> <button onClick={() => deleteComment(el.id)}>delete</button></li>
              }
            }
          )
        }
        </ul>
      </>
  )
}
export default Notes
