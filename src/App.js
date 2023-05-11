import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { Repos, Repo, AddNoteForm } from "./components/Repos";



function App() {
  
  return (
    <>
      <Link to="/">Home</Link>
      
      {/* <button onClick={goBack}>Notes</button> */}

      <Routes>
        <Route path="/" element={<Repos />} />
        <Route path="/:username/:reponame" element={<Repo />} />
        
        <Route
          path="/:username/:reponame/notes/add"
          element={<AddNoteForm />}
        />
      </Routes>
    </>
  );
}

export default App;
