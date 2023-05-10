import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Repo() {
  const [repo, setRepo] = useState({});
  const [notFound, setNotFound] = useState(false);

  const params = useParams();
  console.log(params);

  useEffect(() => {
    //  https://api.github.com/repos/OWNER/REPO
    fetch(`https://api.github.com/repos/${params.username}/${params.reponame}`)
      .then((res) => res.json()) // read the response format which is stored in JSON
      .then((data) => {
        if (data.message === "Not Found") {
          setNotFound(true);
        } else {
          console.log(data);
          setNotFound(false);
          setRepo(data);
        }
      });
  }, []);

  return (
    <>
      {notFound ? (
        <div>
          repo '{params.reponame}' of user '{params.username}' does not exist
        </div>
      ) : (
        <div>
          <ul>
            <li>name: {repo.name}</li>
            <li>forks: {repo.forks}</li>
            <li>stars: {repo.stargazers_count}</li>
            <li>visibility: {repo.visibility}</li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Repo;
