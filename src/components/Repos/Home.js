import './Repos.css'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react'

function Home ({repos, setRepos, username, setUsername, formData, setFormData, notFound, setNotFound}) {

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setUsername(formData.github)
        navigate(`/${formData.github}`)
      }

    const handleChange = (e) => {
        setFormData({...formData, github: e.target.value})
      }

    return (
        <>
            {
                notFound && <div>user '{username}' does not exist</div>
            }
            <form onSubmit={handleSubmit}>
                <input type="text" name="github" onChange={handleChange} value={formData.github || ""}/>
                <button>get repos</button>
            </form>
        </>
    )
}

export default Home