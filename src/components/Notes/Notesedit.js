import { useState, useParams } from 'react'

function NotesEdit() {

    const [formData, setFormData] = useState({})
    const params = useParams()

    const handleOnChange = e => {
        setFormData({...formData, content: e.target.value})
      }

    const handleSubmit = e => {
    e.preventDefault()
    }
    

    return (

        <form onSubmit={handleSubmit}>
          <textarea rows='2' cols='25' type="text" placeholder='Type Note...' onChange={handleOnChange}></textarea>
          <button>Add Note</button>
        </form>
      )
}

export default NotesEdit