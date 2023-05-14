import {useEffect, useState} from 'react'
import {Link} from "react-router-dom"


function Notes () {

    const [state, setState] = useState([])

    useEffect (() => {
        fetch("http://localhost:4000/notes")
        .then(response => response.json())
        .then(data => {
            setState(data)
        })



    }, [])


    return(
        state.map((object, index) => {
            
            return (
                <>
                    <ul>
                        <li key={index}>
                            <div>
                                <strong>Username:</strong>  {object.username}
                            </div>

                            <div>
                            
                                <strong>Repo: </strong>{object.reponame}
                        
                            </div>

                            <div>
                                <strong>Notes: </strong>
                                {object.note}
                            </div>
                        </li>
                        
                    </ul>
                </>
            )
        })
    )
}

export default Notes