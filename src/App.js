import './App.css';
import { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Repos, Repo, AddNote } from './components/Repos'

function App() {

  const [editedNote, setEditedNote] = useState(``)

  return (
    <>
      <Link to="/">home</Link>
      <Routes>
        <Route
          path='/'
          element={<Repos />}
        />
        <Route
          path='/:username/:reponame'
          element={<Repo editedNote={editedNote} setEditedNote={setEditedNote} />}
        />
        <Route 
        path='/:username/:reponame/notes/add'
        element={<AddNote editedNote={editedNote} setEditedNote={setEditedNote} />}
        />
        <Route 
        path='/:username/notes/:id/edit'
        element={<AddNote editedNote={editedNote} setEditedNote={setEditedNote} />}
        />
      </Routes>
    </>
  );
}

export default App
