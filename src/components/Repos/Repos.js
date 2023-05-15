import "./Repos.css";
import { Link } from "react-router-dom";

function Repos({repos, username}) {

  return (
    <>
      {<img style={{width: "100px"}} src={`https://github.com/${username}.png`} alt="avatar"></img>}

      {repos.map((repo) => (
        <div>
          <Link to={`/${username}/${repo.name}`}>{repo.name}</Link>
        </div>
      ))}
    </>
  );
}

export default Repos;
