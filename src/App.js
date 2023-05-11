import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import { Repos, Repo, AddNote } from './components/Repos'
import {useState, useEffect} from 'react'

function App() {

  const [userName, setUsername] = useState('')

  useEffect(() => {
    fetch("http://localhost:4000/notes")
    .then(response => response.json())
    .then(data => {
      setUsername(data[data.length - 1].username)
    })
  }, [])

  
  return (
    <>
      <Link to= {`/`}>home</Link>
      <Routes>
        <Route
          path="/"
          element={<Repos />}
        />
        <Route
          path='/:username/:reponame'
          element={<Repo />}
        />
        <Route 
          path = '/:username/:reponame/:notes/:add'
          element={<AddNote />}
        />
      </Routes>
    </>
  );
}

export default App
