import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const initialNote = [
  {
    note: "Good job!",
  },
  {
    note: "Nice code!",
  },
];

function Repo() {
  const [repo, setRepo] = useState({});
  const [notFound, setNotFound] = useState(false);
  const [notes, setNotes] = useState(initialNote);
  const [formData, setFormData] = useState()

  const params = useParams();

  useEffect(() => {
    //  https://api.github.com/repos/OWNER/REPO
    fetch(`https://api.github.com/repos/${params.username}/${params.reponame}`)
      .then((res) => res.json()) // read the response format which is stored in JSON
      .then((data) => {
        if (data.message === "Not Found") {
          setNotFound(true);
        } else {
          setNotFound(false);
          setRepo(data);
        }
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newText = e.target.value;
    console.log("event", e.target.value);
    const newNote = {
      note: newText,
    };
    setNotes([...notes, newNote]);
    console.log("note", notes);
  };

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
      <h3>Note section:</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" value={}></input>
        </label>

        <input type="submit" value="Add"></input>
      </form>

      {notes.map((noteObj) => {
        <Repo notes={noteObj} handleSubmit={handleSubmit} />;
      })}
    </>
  );
}

export default Repo;
