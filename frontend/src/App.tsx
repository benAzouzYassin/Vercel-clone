import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import { ImportPage } from './pages/NewProject';
import { Deploy } from './pages/Deploy';
import Project from './pages/Project';


function App() {

  return (<Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/import" element={<ImportPage />} />
    <Route path="/deploy" element={<Deploy />} />
    <Route path="/project" element={<Project />} />
  </Routes>)
}

export default App
