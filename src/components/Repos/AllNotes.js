import { useState, useEffect } from "react"
function AllNotes(){
    const [comments, setComments] = useState([])
    useEffect(() => {
        const getNote = async () => {
          const res = await fetch(`http://localhost:4000/data`)
          const data = await res.json()
          setComments(data)
          console.log(data)
        }
        getNote()
        }, [])
    return (
        <>
        <ul>
        {
          comments.map((el) => {
            console.log(`here`,el.comment)
            const message = `Note: ${el.comment} Repo: ${el.repo} Owner:${el.username}`
            return (
                <li>{message}</li>
            )
      }
          )
        }
        </ul>
      </>
    )
}
export default AllNotes