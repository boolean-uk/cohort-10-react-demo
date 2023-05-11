import './App.css';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Repos, Repo } from './components/Repos'
import Notes from './components/Notes/Notes'
import NotesEdit from './components/Notes/Notesedit'


function App() {

  const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }


  return (
    <>
      <Link to="/">home</Link>
      <button onClick={goBack}>Back</button>
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
        {/* <Route
          path='/:username/:reponame/notes/:id/edit'
          element={<NotesEdit/>}
        /> */}
      </Routes>
    </>
  );
}

export default App
