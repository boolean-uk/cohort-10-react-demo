import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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

  // const handleDelete = (note) => {
  //   const newNotes = notes.filter((item) => {
  //   if (item.id !== note.id) {
  //     return note;
  //   }})
  //   setNotes(newNotes);
  //   const options = {
  //     method: "DELETE",
  //   };
  //   fetch(`http://localhost:4000/initialNote/${note.id}`, options)
  //   .then(res => res.text())
  // console.log("Note ID:",notes);
  // console.log("Note IDDD:",notes.id);
  // };

  const handleDelete = (note) => {
    const newNotes = notes.filter((item) => {
      if (item.id !== note.id) {
        return note;
      }
      console.log("Note ID1:", note);
    });
    setNotes(newNotes);
    const options = {
      method: "DELETE",
    };
    fetch(`http://localhost:4000/initialNote/${note.id}`, options).then((res) =>
      res.text()
    );
    console.log("Note ID2:", notes);
    console.log("Note ID3:", note.note);
  };

  const handleChange = (note) => {
    note.preventDefault();
  };

  return (
    <>
      {notFound ? (
        <div>
          repo '{params.reponame}' of user '{params.username}' does not exist
        </div>
      ) : (
        <div>
          {/* {console.log("note", notes)} */}
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
      {notes.length > 0 ? (
        [...notes].reverse().map((noteObj, index) => {
          return (
            <div key={index}>
              {" "}
              {noteObj.note}
              <span>
                {/* <button onClick={handleChange}>Edit</button> */}
                {/* <button onClick={handleDelete}>Delete</button> */}
              </span>
            </div>
          );
        })
      ) : (
        <p>No notes found!</p>
      )}
    </>
  );
}

export default Repo;
