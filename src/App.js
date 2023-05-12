import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import {
  Repos,
  Repo,
  Notes,
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
  const [reponame, setReponame] = useState()
  const [username, setUsername] = useState(params.username);
  const [notFound, setNotFound] = useState(true);

  useEffect(() => {
      // https://api.github.com/users/${username}/repos
      fetch(`https://api.github.com/users/${username}/repos`)
        .then(res => res.json()) // read the response format which is stored in JSON
        .then(data => {
        if (data.message === 'Not Found') {
          // setNotFound(true)
        } else {
          // setNotFound(false)
          setRepos(data)
        }
      })
    }, [username])


  return (
    <>
      {console.log('repos1', repos)}
      <Link to="/">home</Link>
      <Link to='/notes'><button>All Notes</button></Link>

      <Routes>
        <Route
          path="/"
          element={
            <Search
              setRepo={setRepo}
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
              {console.log('username1', username)}
              <Users setUsername={setUsername}/>
              <Search username={username} setUsername={setUsername} setRepo={setRepo} />{" "}
              <Repos
                repos={repos}
                setRepos={setRepos}
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
