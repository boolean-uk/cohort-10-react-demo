import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Form () {
    const [username, setUsername] = useState('')
    const [formData, setFormData] = useState({
        github: ''
    })
    const [notFound, setNotFound] = useState(false)
    const navigate = useNavigate()
    
  
        
    useEffect(() => {

        // https://api.github.com/users/${username}/repos
        fetch(`https://api.github.com/users/${username}repos`)
        .then(res => res.json()) // read theresponseformat which is stored in JSON
        .then(data => {
            
            if (data.message === 'Not Found') {
                setNotFound(true)
            } else {
                setNotFound(false)
                    
            }
        })
    }, [username])
        
    
    
    console.log(notFound)
    
    const handleChange = (e) => {
        setFormData({...formData, github: e.target.value})
        
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setUsername(formData.github)
        if (notFound === false) {

            navigate(`/${formData.github}`)
        } else if (notFound === true) {
            navigate('/')
        }

    }

    return (
    <>
      {
        notFound ? ( <div>user '{username}' does not exist</div>
        ) : (

        <form onSubmit={handleSubmit}>
            <input type="text" name="github" onChange={handleChange} value={formData.github}/>
            <button>get repos</button>
        </form>
        )
      }
    </>
    )
}

export default Form

