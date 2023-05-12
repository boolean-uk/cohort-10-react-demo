import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import { Repos, Repo, AddNote, Form } from './components/Repos'


function App() {

  // 1. When a user navigates to the index ('/') they should only see the input field and button. 


  return (
    <>
      <Link to= {`/`}>home</Link>
      <Routes>
        <Route
          path='/'
          element={<Form />} 
        />
        <Route
          path="/:username"
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
