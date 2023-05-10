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
  }

  const handleOnChange = e => {
    setFormData({...formData, content: e.target.value})
  }

  const postNote = () => {
    fetch(`http://localhost:3001/${params.username}`)
    .then(res => res.json())
    .then(res => {
      let notesArray = []
      if(res[params.reponame]) {
        notesArray = res[params.reponame]
      } else {
        res[params.reponame] = notesArray
      }
      notesArray.push({...formData})
      console.log('notesArray:', notesArray)


      const options = {
        method: 'POST',
        header: {
          "Content-Type": "application/json"
        },
        body: {}
      }
      options.body[params.reponame] = notesArray
      console.log('options', options.body)
      fetch(`http://localhost:3001/${params.username}`, options)
      .then(res => {
        res.json()
        console.log(res)
      })
      
      
    })
  }
  return (

    <form onSubmit={handleSubmit}>
      <textarea rows='2' cols='25' type="text" placeholder='Type Note...' onChange={handleOnChange}></textarea>
      <button>Add Note</button>
    </form>
  )
}

export default Notes