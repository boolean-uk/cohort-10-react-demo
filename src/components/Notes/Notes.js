import { useState } from 'react'
import { redirect, useParams } from "react-router-dom"

function Notes() {
  
  const [formData, setFormData] = useState({})
  const [note, setNote] = useState('')

  const params = useParams()

  const handleSubmit = e => {
    e.preventDefault()
    setNote(formData.content)
    postNote()
    // .then(() => window.location.replace(`http://localhost:3000/${params.username}/${params.reponame}`))
  }

  const handleOnChange = e => {
    setFormData({...formData, content: e.target.value})
  }

  const postNote = async () => {
    return fetch(`http://localhost:3001/users`)
    .then(res => {
      console.log(res.status)
      if(res.status === 404) {
        createUser()
      }
      res.json()
    })
    .then(res => {   
      console.log('response', res)   
      const usersArray = res
      let currentUser = ''
      let newNotes = ''

      usersArray.forEach(user => {
        if(user.username === params.username) {
          user.repos.forEach(repo => {
            if(repo.reponame === params.reponame) { 
              currentUser = user    
              newNotes = [{...formData}, ...repo.notes]
              repo.notes = newNotes
            }
          })
        } else {
          createUser()
        }

        let id = currentUser.id !== undefined ? (currentUser.id) : ("")
        const body = {
          "id": id,
          "username": params.username,
          "repos": currentUser.repos
        }
  
        const options = {
          method: 'PATCH',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        }
  
        fetch(`http://localhost:3001/users/${currentUser.id}`, options)
        .then(res => res.json())
        .then(res => console.log("response", res))
        .catch(err => console.error(err));
      })

      

      // let notesArray = []
      // if(res[params.reponame]) {
      //   notesArray = res[params.reponame]
      // }

      // notesArray.unshift({...formData})
      // console.log('notesArray:', notesArray)

      // const body = {}
      // body[params.reponame] = notesArray
      // const options = {
      //   method: 'PATCH',
      //   headers: {"Content-Type": "application/json"},
      //   body: JSON.stringify(body)
      // }

      // console.log('options', options.body)
      // console.log('username', params.username)

      // fetch(`http://localhost:3001/${params.username}`, options)
      // .then(res => res.json())
      // .then(res => console.log("response", res))
      // .catch(err => console.error(err));
    })
    
  }

  const createUser = () => {
    const body = {
      "id": "",
      "username": params.username,
      "repos": []
    }

    const options = {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)
    }

    fetch(`http://localhost:3001/users`, options)
    .then(res => res.json())
    .then(res => console.log("created user:", res))
    .catch(err => console.error(err));
  }
  return (

    <form onSubmit={handleSubmit}>
      <textarea rows='2' cols='25' type="text" placeholder='Type Note...' onChange={handleOnChange}></textarea>
      <button>Add Note</button>
    </form>
  )
}

export default Notes