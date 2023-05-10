import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import {
  Repos,
  Repo,
  NotesForm,
  NotesEditForm,
  Search,
  Notes
} from './components/Repos'

function App() {

  return (
    <>
      <Link to="/">home</Link>
      <Link to="/notes">notes</Link>
      <Routes>
        <Route
          path='/'
          element={<Search />}
        />
        <Route
          path='/:username'
          element={<Repos />}
        />
        <Route
          path='/:username/:reponame'
          element={<Repo />}
        />
        <Route
          path='/:username/:reponame/notes/add'
          element={<NotesForm />}
        />
        <Route
          path='/:username/notes/:noteId/edit'
          element={<NotesEditForm />}
        />
        <Route
          path='/notes'
          element={<Notes />}
        />
      </Routes>
    </>
  );
}

export default App
