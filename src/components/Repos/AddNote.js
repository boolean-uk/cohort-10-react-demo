function AddNote() {
  const handleSubmit = (e) => {
    e.preventDefault()
    const commentInput = e.target[0].value
    const authorInput = e.target[1].value

    const newNote = {
      commentInput,
      authorInput
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newNote)
    }

    fetch('http://localhost:4000/data', options).then(function(response) {
      return response.json()
    })
  }
  return(
    <>
      <form onSubmit={handleSubmit}>
        <label>Comment
            <input type='text'></input>
        </label>
        <label>Author
            <input type='text'></input>
        </label>
            <button>Add new Note</button>
      </form>
    </>
  )
}

export default AddNote
