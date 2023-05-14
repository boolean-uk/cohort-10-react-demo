import {useParams, useNavigate} from "react-router-dom"
import {useState} from 'react'


function Edit () {

    
    const params = useParams()
    const navigate = useNavigate()
    console.log(params)
    const [formValue, setFormValue] = useState(params.notes)

    const handleSubmit = (event) => {
        event.preventDefault()

        const newNote = {
            note: event.target[0].value
        }

        const options = {
            method: "PATCH",
            headers: {
                "content-type":
                "application/json"
            },
            body: JSON.stringify(newNote)
        }

        fetch(`http://localhost:4000/notes/${params.id}`, options)
        .then(response => response.json())
        .then(data => {
            navigate(`/${params.username}/${data.reponame}`)
            
        })


    }

    const handleChange = (event) => {
        setFormValue(event.target.value)
    }


    return(
        <form onSubmit={handleSubmit}>
            <input type="text" name="edit" value={formValue} onChange={handleChange}/>
            <button>Edit</button>
        </form>
    )
}


export default Edit