import {useNavigate, useParams } from "react-router-dom"





function AddNote () {
    

    const params = useParams()
    console.log(params)

    const navigate = useNavigate()

    
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(event.target[0].value)
        
        const newNote = {
            note: event.target[0].value,
            username: params.username,
            reponame: params.reponame
        }

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newNote)
        }
        
        fetch('http://localhost:4000/notes', options)
        .then(response => response.json())
        

        /* When the note is added, the app should navigate back to the repo page and the user should see all the notes including the newly created one. */
        
        navigate(`/${params.username}/${params.reponame}`)
      
     
    }
    
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input  type='text' name='note'/>
                <button>
                    Add Note
                </button>
            
            </form>
        
        </>
    )

}


export default AddNote