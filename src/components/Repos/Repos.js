import "./Repos.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// show all repositories for me on the page by default when i load the page.
// show also a input field where i can type any user's github username
// when i hit the button, i want to see their repositories on the page.

const initialFormData = {
  github: "dearshrewdwit",
};

function Repos() {
  const [repos, setRepos] = useState([]);
  const [username, setUsername] = useState("dearshrewdwit");
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    // https://api.github.com/users/${username}/repos
    fetch(`https://api.github.com/users/${username}/repos`)
      .then((res) => res.json()) // read the response format which is stored in JSON
      .then((data) => {
        if (data.message === "Not Found") {
        } else {
          setRepos(data);
        }
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="github"
          onChange={handleChange}
          value={formData.github}
        />
        <button>get repos</button>
      </form>
      {repos.map((repo) => (
        <div>
          <Link to={`/${username}/${repo.name}`}>{repo.name}</Link>
        </div>
      ))}
    </>
  );
}

export default Repos;
