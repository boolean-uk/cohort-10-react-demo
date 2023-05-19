import { Link } from "react-router-dom";

function Repo ({username, reponame}) {
  return (
    <div>
        <Link to={`/${username}/${reponame}`}>{reponame}</Link>
    </div>
  )
}

export default Repo
