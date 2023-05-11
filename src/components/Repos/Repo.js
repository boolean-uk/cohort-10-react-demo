import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom"; // ADD USE NAVIGATE
// import { AddNoteForm } from "./AddNoteForm";

function Repo() {
  const [repo, setRepo] = useState({});
  const [notFound, setNotFound] = useState(false);
  const [notes, setNotes] = useState([]);
  // const [formData, setFormData] = useState();

  const params = useParams();

  useEffect(() => {
    fetch("http://localhost:4000/initialNote")
      .then((res) => res.json())
      .then((json) => setNotes(json));
  }, []);

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

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const newText = formData;
  //   console.log("event", e.target.value);
  //   const newNote = {
  //     note: newText,
  //   };
  //   setNotes([...notes, newNote]);
  //   console.log("note", notes);

  //   setFormData("");
  // };

  // const handleChange = (e) => {
  //   setFormData(e.target.value);
  // };

  //   useNavigate(() => {
  //     const goBack = () => {
  //       navigate(-1);
  //     };
  //  });

  return (
    <>
      {/* <button onClick={useNavigate}>Notes</button> */}
      {notFound ? (
        <div>
          repo '{params.reponame}' of user '{params.username}' does not exist
        </div>
      ) : (
        <div>
          {console.log("note", notes)}
          <ul>
            <li>name: {repo.name}</li>
            <li>forks: {repo.forks}</li>
            <li>stars: {repo.stargazers_count}</li>
            <li>visibility: {repo.visibility}</li>
          </ul>
        </div>
      )}
      <h3>Note section:</h3>
      <Link to={`/${params.username}/${params.reponame}/notes/add`}>
        <button>Notes</button>
      </Link>
     
      {/* <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="Add note here"
            id="note"
            value={formData}
            onChange={handleChange}
          ></input>
        </label>

        <input type="submit" value="Add"></input>
      </form> */}
      {notes.length > 0 ? (
        notes.map((noteObj, index) => {
          return <div key={index}> {noteObj.note} </div>;
        })
      ) : (
        <p>No notes found!</p>
      )}
    </>
  );
}

export default Repo;
