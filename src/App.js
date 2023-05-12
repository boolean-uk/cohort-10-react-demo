import "./App.css";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  Repos,
  Repo,
  Notes,
  AddNote,
  Search,
  EditNote,
  AllNotes
} from "./components/Repos";

function App() {
  const [repo, setRepo] = useState({})
  const [reponame, setReponame] = useState()
  const [username, setUsername] = useState("");
  const [notFound, setNotFound] = useState(true);
  return (
    <>
      <Link to="/">home</Link>
      <Link to='/notes'><button>All Notes</button></Link>

      <Routes>
        <Route
          path="/"
          element={
            <Search
              reponame={reponame}
              setReponame={setReponame}
              username={username}
              setUsername={setUsername}
              setNotFound={setNotFound}
              notFound={notFound}
            />
          }
        />
        <Route
          path="/:username"
          element={
            <>
              <Search username={username} setUsername={setUsername} />{" "}
              <Repos
                setNotFound={setNotFound}
                notFound={notFound}
                setUsername={setUsername}
                username={username}
              /> 
            </>
          }
        />
        <Route
          path="/:username/:reponame"
          element={<Repo
            username={username} 
            repo={repo}
            setRepo={setRepo}
            reponame={reponame}
            setReponame={setReponame}
          />}
        />
        <Route path="/:username/:reponame/notes/add" element={<AddNote />} />
        <Route path="/:username/notes/:id/edit" element={<EditNote 
          repo={repo}
          reponame={reponame}
          setReponame={setReponame}
        />} />
        <Route path="/notes" element={<AllNotes />} />
      </Routes>
    </>
  );
}

export default App;
