import './App.css';
import { Routes, Route, Link } from "react-router-dom";

import {
  SearchPage,
  UserPage,
  RepoPage,
  CreateNotePage,
  EditNotePage,
  NotesPage
} from './pages'

function App() {

  return (
    <>
      <Link to="/">home</Link>
      <Link to="/notes">notes</Link>
      <Routes>
        <Route
          path='/'
          element={<SearchPage />}
        />
        <Route
          path='/:username'
          element={<UserPage />}
        />
        <Route
          path='/:username/:reponame'
          element={<RepoPage />}
        />
        <Route
          path='/:username/:reponame/notes/add'
          element={<CreateNotePage />}
        />
        <Route
          path='/:username/notes/:noteId/edit'
          element={<EditNotePage />}
        />
        <Route
          path='/notes'
          element={<NotesPage />}
        />
      </Routes>
    </>
  );
}

export default App
