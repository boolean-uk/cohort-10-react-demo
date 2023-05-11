import { useState } from "react";

function AddNoteForm() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newText = formData;
    console.log("event", e.target.value);
    const newNote = {
      note: newText,
    };
    setNotes([...notes, newNote]);
    console.log("note", notes);

    setFormData("");
  };

  const handleChange = (e) => {
    setFormData(e.target.value);
  };
  return (
    <>
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
    </>
  );
}

export default AddNoteForm;
