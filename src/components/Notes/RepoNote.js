import { Link } from 'react-router-dom'

function RepoNote ({note, deleteNote}) {
  return (
    <div>
      {note.contents} at {(new Date(Date.parse(note.timestamp))).toLocaleTimeString()}
      <Link to={`/${note.repoOwner}/notes/${note.id}/edit`}>edit</Link>
      <button onClick={() => deleteNote(note.id)}>delete</button>
    </div>
  )
}

export default RepoNote
