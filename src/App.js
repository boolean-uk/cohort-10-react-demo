import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import { Repos, Repo } from './components/Repos'
import Notes from './components/Notes/Notes'

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
          element={<Notes/>}
        />
      </Routes>
    </>
  );
}

export default App
