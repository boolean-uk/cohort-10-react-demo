import { useEffect, useState } from "react"
export default function NoteList () {
    const [noteList, setNoteList] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetch('http://localhost:4000/Note')
        .then(res => res.json())
        .then(data => {
            const newArr = []
            for(let i = 0; i < data.length; i++){
            if(data[i].note.includes(search)){
                newArr.push(data[i])
            }
        }
        setNoteList(newArr)
        })
    }, [search])
    
    const handleChange = (e) => {
        setSearch(e.target.value)

    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>  
            <form onSubmit={handleSubmit}>
                <label>
                    Notes that include
                    <input type="text" name="search" onChange={handleChange}/>
                </label>
            </form>
            <ul>
                {
                    noteList.map((item) => <li>Note:{item.note} ~ User: {item.user} ~ Repo: {item.repo}</li>)
                }
            </ul>
        </>
    )
}