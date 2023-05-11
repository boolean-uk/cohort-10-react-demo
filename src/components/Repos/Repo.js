import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

function Repo () {
  const [repo, setRepo] = useState({})
  const [notFound, setNotFound] = useState(false)
  const [notes, setNotes] = useState([])

  const params = useParams()
  // console.log(params)

  // useEffect(() => {
  //   //  https://api.github.com/repos/OWNER/REPO
  //   fetch(`https://api.github.com/repos/${params.username}/${params.reponame}`)
  //     .then(res => res.json()) // read the response format which is stored in JSON
  //     .then(data => {
  //     if (data.message === 'Not Found') {
  //       setNotFound(true)
  //     } else {
  //       // console.log(data)
  //       setNotFound(false)
  //       setRepo(data)
  //     }
  //   })
  // }, [])

  useEffect(() => {
    fetch(`http://localhost:4000/Notes`)
    .then(res => res.json())
    .then(data => {
      setNotes(data)
    })
  }, [])

  const testFunction = () => {
    const testRepo = {
      name: "cohort-10-react-demo",
      forks: 0,
      stars: 0,
      visibility: "public"
    }
    setRepo(testRepo)
  }

  const testFetch = () => {
    const testRepo = {
      name: "cohort-10-react-demo",
      forks: 0,
      stars: 0,
      visibility: "public"
    }
    setRepo(testRepo)

    // fetch(`http://localhost:4000/Notes/?repo=cohort-10-react-demo`)
    fetch(`http://localhost:4000/Notes`)
    .then(res => res.json())
    .then(data => {
      setNotes(data)
    })
  }


  return (
    <>
      {
        notFound ? (
          <div>repo '{params.reponame}' of user '{params.username}' does not exist</div>
        ) : (
          <div>
            <ul>
              <li>name: {repo.name}</li>
              <li>forks: {repo.forks}</li>
              <li>stars: {repo.stargazers_count}</li>
              <li>visibility: {repo.visibility}</li>
            </ul>
          </div>
        )
      }
      <Link to={`/${params.username}/${repo.name}/notes/add`} >
        <button>Add Note</button>
      </Link>
      <button onClick={testFunction} >TEST</button>
      <button onClick={testFetch} >TEST FETCH</button>
      <h2>Notes</h2>
      <div>
        <ul>
          {/* {notes.map(item => {
            if (item.user === params.username && item.repo === repo.name) {
              return <li>{item.note}</li>
            }
          })} */}
          {notes
            .filter(item => item.user === params.username && item.repo === repo.name)
            .reverse()
            .map(item => {
              return <li key={item.id}>{item.note}</li>
            })

          }
        </ul>
      </div>
    </>
  )
}

export default Repo


