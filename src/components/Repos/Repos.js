import './Repos.css'
import { RepoLink } from '.'

function Repos ({username, repos}) {
  return (
    <>
      {
        repos.map(repo => (
          <RepoLink
            key={repo.id}
            username={username}
            reponame={repo.name}
          />
        ))
      }
    </>
  )
}

export default Repos
