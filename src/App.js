import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import { Repos, Repo, NotesForm, Search } from './components/Repos'

function App() {

  return (
    <>
      <Link to="/">home</Link>
      <Routes>
        <Route
          path='/'
          element={<Search />}
        />
        <Route
          path='/:username'
          element={<Repos />}
        />
        <Route
          path='/:username/:reponame'
          element={<Repo />}
        />
        <Route
          path='/:username/:reponame/notes/add'
          element={<NotesForm />}
        />
      </Routes>
    </>
  );
}

export default App
