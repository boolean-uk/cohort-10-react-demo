import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import {
  Repos,
  Repo,
  AddNote,
  Search,
  EditNote,
  AllNotes,
  Users
} from "./components/Repos";

function App() {

  const params = useParams()

  const [repo, setRepo] = useState({})
  const [repos, setRepos] = useState([])
  const [username, setUsername] = useState(params.username);

  useEffect(() => {
      fetch(`https://api.github.com/users/${username}/repos`)
        .then(res => res.json()) // read the response format which is stored in JSON
        .then(data => {
        if (data.message !== 'Not Found') {
          setRepos(data)
        }
      })
    }, [username])


  return (
    <>
      <Link to="/">home</Link>
      <Link to='/notes'><button>All Notes</button></Link>

      <Routes>
        <Route
          path="/"
          element={
            <Search />
          }
        />

        <Route
          path="/:username"
          element={
            <>
              <Users setUsername={setUsername}/>
              <Search />{" "}
              <Repos
                repos={repos}
                username={username}
              /> 
            </>
          }
        />

        <Route
          path="/:username/:reponame"
          element={
            <Repo
              repo={repo}
              setRepo={setRepo}
            />
          }
        />
        <Route path="/:username/:reponame/notes/add" element={<AddNote />} />

        <Route path="/:username/notes/:id/edit" element={
          <EditNote 
            repo={repo}
          /> 
        } />

        <Route path="/notes" element={<AllNotes />} />
      </Routes>
    </>
  );
}

export default App;
