import { useState, useEffect } from "react"
function AllNotes(){
  const [filter, setFilter] = useState('')
  const [comments, setComments] = useState([])
  const [filteredComments, setFilteredComments] = useState([])

  function filterMatchesComment(stateCommentFilter, comment) {
    // console.log(comment.toLowerCase())
    // console.log(stateCommentFilter.toLowerCase())
    if (stateCommentFilter === '') {
      return true
    } else if (comment.toLowerCase().includes(stateCommentFilter.toLowerCase())) {
      return true
    } 
    return false
  }


  useEffect(() => {
      const getNote = async () => {
        const res = await fetch(`http://localhost:4000/data`)
        const data = await res.json()
        setComments(data)
        // console.log(data)
      }
      getNote()
      }, [])

  const handleChange = (e) => {
    e.preventDefault();
    const filter = e.target.value
    // console.log('comments', comments)
    const newFilteredComments = []
    for (let i = 0; i < comments.length; i++) {
      if (!(filterMatchesComment(filter, comments[i].comment))) continue
      newFilteredComments.push(comments[i])
    }
    setFilteredComments(newFilteredComments)
    console.log('filteredComments', filteredComments)
  }

   handleChange(e)

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
                // console.log(`here`, el.comment)
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
