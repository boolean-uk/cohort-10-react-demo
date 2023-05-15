import { Link, useParams } from "react-router-dom"
import { Notes } from './'

function Repo ({repo, setRepo}) {
  const params = useParams()

    fetch(`https://api.github.com/repos/${params.username}/${params.reponame}`)
      .then(res => res.json()) // read the response format which is stored in JSON
      .then(data => {
      if (data.message !== 'Not Found') {
        setRepo(data)
      }
    })

  return (
    <>
  
      <div>
        <Link to={`/${params.username}/${repo.name}/notes/add`}><button>Add Note</button> </Link>
        <ul>
          <li>name: {repo.name}</li>
          <li>forks: {repo.forks}</li>
          <li>stars: {repo.stargazers_count}</li>
          <li>visibility: {repo.visibility}</li>
        </ul>
      </div>
      <Notes />
    </>
  )
}

export default Repo
