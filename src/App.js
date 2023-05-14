import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import { Repos, Repo, AddNote, Form, Edit, Notes } from './components/Repos'


function App() {

  // 1. When a user navigates to the index ('/') they should only see the input field and button. 


  return (
    <>
    
      
      <Link to= {`/`}>Home</Link>
      
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
          <Route
            path='/:username/:notes/:id/edit'
            element = {<Edit />}
          />
        
        <Route
          path='/notes' 
          element = {<Notes />}
        />

      </Routes>
    </>
  );
}

export default App
