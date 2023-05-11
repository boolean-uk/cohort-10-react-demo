import './App.css';
import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import { Repos, Repo, Notes, AddNote, Search } from './components/Repos'


function App() {
  const [username, setUsername] = useState('')
  const [notFound, setNotFound] = useState(true)
  return (
    <>
      <Link to="/">home</Link>
      <Routes>
        <Route
          path='/'
          element={<Search username={username} setUsername={setUsername} setNotFound={setNotFound} notFound={notFound}/>}
        />
        <Route
          path='/:username'
          element={<><Search username={username} setUsername={setUsername}/> <Repos setNotFound={setNotFound} notFound={notFound} setUsername={setUsername} username={username}/></>}
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
