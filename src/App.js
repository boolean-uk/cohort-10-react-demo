import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import { Repos, Repo, Notes, Searchbar, Edit, NoteList } from './components/Repos'

function App() {

  return (
    <>
      <Link to="/">home</Link>
      <Link to="/notes">---notes</Link>
      <Routes>
        <Route
          path='/'
          element={<Searchbar />}
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
          element={<Notes />}
        />
        <Route 
          path='/:username/notes/:id/edit'
          element={<Edit />}
        />
          <Route
          path='/notes'
          element={<NoteList />}
        />
      </Routes>
    </>
  );
}

export default App


// Notes feature

// When a user navigates to a user’s repo page ‘/dearshrewdwit/bowling-challenge’, then a user should see, in addition to the information about a repo, a notes section. This includes:
// - A clickable element to add a note
// - All current notes listed down the page in reverse chronological order (most recent at the top) for the repository
// - Notes should be persisted to a data store

// When a user clicks to add a note, then the url should change to ‘/dearshrewdwit/bowling-challenge/notes/add’ and show a text input field and a button to add the note. When the note is added, the app should navigate back to the repo page and the user should see all the notes including the newly created one.