import "./Repos.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const initialFormData = {
  github: "Shylan21",
};

function Repos() {
  const [repos, setRepos] = useState([]);
  const [username, setUsername] = useState();
  const [formData, setFormData] = useState(initialFormData);
  const [notFound, setNotFound] = useState(false);
  const [user, setUser] = useState({});

  // const params = useParams();

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Not Found") {
          setNotFound(true);
        } else {
          setNotFound(false);
          setRepos(data);
        }
      });
  }, [username]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data);
      });
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsername(formData.github);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, github: e.target.value });
  };

  return (
    <>
      {notFound && <div>User "{username}" does not exist</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="github"
          onChange={handleChange}
          value={formData.github}
        />
        <button>get repos</button>
      </form>
      <img src={user.avatar_url} alt={username} width={100} />

      {repos.map((repo) => (
        <div>
          <Link to={`/${username}/${repo.name}`}>{repo.name}</Link>
        </div>
      ))}
    </>
  );
}

export default Repos;
