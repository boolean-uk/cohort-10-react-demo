import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"

function Notes(){
const [notes, setNotes]= useState()
return(
    <>
        <form>
            <input type='text'></input>
            <button>Add new Note</button>
            
        </form>
    </>
)
}
export default Notes