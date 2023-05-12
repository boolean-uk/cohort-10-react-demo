import './App.css';
import { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { Repos, Repo, AddNote, Home } from './components/Repos'
import AllNotes from './components/Repos/AllNotes';

function App() {

  const [editedNote, setEditedNote] = useState(``)
  const [repos, setRepos] = useState([])
  const [username, setUsername] = useState('')
  const [formData, setFormData] = useState('')
  const [notFound, setNotFound] = useState(false)
  const [notes, setNotes] = useState([])

  const clearSearchBar = () => {
    setFormData({...formData, github:""})
  }
  
  return (
    <>
      <Link to="/AllNotes" >
      <button>ALL NOTES</button></Link>
      <Link to="/">
        {/* <button >HOME</button></Link> */}
        <button onClick={clearSearchBar} >HOME</button></Link>
      <Routes>
        <Route 
        path="/AllNotes"
        element={<AllNotes
        notes={notes}
        setNotes={setNotes}
        />}
        />
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
          element={<Repo editedNote={editedNote} setEditedNote={setEditedNote} notes={notes} setNotes={setNotes} />}
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
