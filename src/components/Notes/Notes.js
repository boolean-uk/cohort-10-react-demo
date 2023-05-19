function Notes ({notes, NoteType, deleteNote}) {
  return (
    <>
      {
        notes.map(note => <NoteType key={note.id} note={note} deleteNote={deleteNote}/>)
      }
    </>
  )
}

export default Notes
