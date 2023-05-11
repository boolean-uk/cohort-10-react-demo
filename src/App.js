import './App.css';
import { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Repos, Repo, AddNote, Home } from './components/Repos'

function App() {

  const [editedNote, setEditedNote] = useState(``)
  const [repos, setRepos] = useState([])
  const [username, setUsername] = useState('')
  const [formData, setFormData] = useState('')
  const [notFound, setNotFound] = useState(false)

  const clearSearchBar = () => {
    formData.github = ""
  }

  return (
    <>
      <Link to="/">
        <button onClick={clearSearchBar} >HOME</button></Link>
      <Routes>
        <Route
          path='/'
          element={<Home 
            repos={repos}
            setRepos={setRepos}
            username={username}
            setUsername={setUsername}
            formData={formData}
            setFormData={setFormData}
            notFound={notFound}
            setNotFound={setNotFound}
          />}
        />
        <Route
        path='/:username'
        element={<Repos 
          repos={repos}
          setRepos={setRepos}
          username={username}
          setUsername={setUsername}
          formData={formData}
          setFormData={setFormData}
          notFound={notFound}
          setNotFound={setNotFound}
        />}
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
