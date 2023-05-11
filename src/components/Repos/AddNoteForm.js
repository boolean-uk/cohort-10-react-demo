import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function AddNoteForm() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState();
  const [newId, setNewId] = useState();
  const [newNotes, setNewNote] = useState();

  const params = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newText = formData;
    const idData = newId;
    console.log("event", e.target.value);

    const newNote = {
      id: idData,
      note: newText,
    };

    setNotes([...notes, newNote]);
    setNewId([...notes, newId]);
    console.log("notessss", newId);

    setFormData("");

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    };
    console.log("option", options);
    fetch("http://localhost:4000/initialNote", options).then(function (
      response
    ) {
      return response.json();
    });
    setNewNote([...notes, newNotes]);
  };

  const handleChange = (e) => {
    setFormData(e.target.value);
  };
  return (
    <>
      <Link to={`/${params.username}/${params.reponame}`}>Go back!</Link>
      <form onSubmit={handleSubmit}>
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
      </form>
      {notes.length > 0 ? (
        notes.map((noteObj, index) => {
          console.log("hello", notes);
          return <div key={index}> {noteObj.note} </div>;
        })
      ) : (
        <p>No notes found!</p>
      )}
    </>
  );
}

export default AddNoteForm;
