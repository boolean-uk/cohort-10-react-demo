import { useState, useEffect } from "react"

function AllNotes(){
  const [filter, setFilter] = useState('')
  const [comments, setComments] = useState([])
  let filteredComments = comments
  if (filter) {
    filteredComments = filteredComments.filter((comment) => comment.comment.toLowerCase().includes(filter.toLowerCase()))
  }

  useEffect(() => {
      const getNote = async () => {
        const res = await fetch(`http://localhost:4000/data`)
        const data = await res.json()
        setComments(data)
      }
      getNote()
      }, [])

  const handleChange = (e) => {
    e.preventDefault();
    const filter = e.target.value
    setFilter(filter)
  }
 
    return (
      <>
        <form >
          <label htmlFor=""> Search
            <input type="text" defaultValue={''} onChange={handleChange}></input>
          </label>
        </form>
          <ul>
            {
              filteredComments.map((el) => {
                const message = `Note: ${el.comment} Repo: ${el.repo} Owner:${el.username}`
                return (
                  <li>{message}</li>
                )
              })
            }
          </ul>
      </>
    )
}
export default AllNotes
