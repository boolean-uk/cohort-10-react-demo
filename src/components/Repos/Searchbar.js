import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const initialFormData = {
    github: '',
    datadata: ''
  }

function Searchbar () {
    const [username, setUsername] = useState('')
    const [formData, setFormData] = useState(initialFormData)
    const [notFound, setNotFound] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        // https://api.github.com/users/${username}/repos
        fetch(`https://api.github.com/users/${username}/repos`)
          .then(res => res.json()) // read the response format which is stored in JSON
          .then(data => {
              setFormData({...formData, datadata: data.message})
          if (data.message !== 'Not Found') {
            setNotFound(false)
            navigate(`/${username}`)
          }
        })
      }, [username])

      const handleSubmit = (e) => {
          e.preventDefault()
          setUsername(formData.github)
          if (formData.datadata === 'Not Found') {
              setNotFound(true)
            } 
    }
    
    const handleChange = (e) => {
        setFormData({...formData, github: e.target.value})
        console.log(formData)
      }

    return (
        <>
            {
                notFound && <div>user '{username}' does not exist</div>
            }
            <form onSubmit={handleSubmit}>
                <input type="text" name="github" onChange={handleChange} value={formData.github}/>
                <button>get repos</button>
            </form>
        </>
    )
}

export default Searchbar