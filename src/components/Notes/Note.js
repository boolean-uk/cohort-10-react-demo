import { Link } from 'react-router-dom'

function Note ({ note }) {
  return (
    <div>
      {note.contents} at {(new Date(Date.parse(note.timestamp))).toLocaleTimeString()}
      <Link to={`/${note.repoOwner}/${note.repo}`}>{note.repo}</Link>
      <Link to={`/${note.repoOwner}`}>{note.repoOwner}</Link>
    </div>
  )
}

export default Note
