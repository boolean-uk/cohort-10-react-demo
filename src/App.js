import './App.css';
import { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Repos, Repo, AddNote } from './components/Repos'

function App() {

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
          element={<Repo />}
        />
        <Route 
        path='/:username/:reponame/notes/add'
        element={<AddNote />}
        />
      </Routes>
    </>
  );
}

export default App
