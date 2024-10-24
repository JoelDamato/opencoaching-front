import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Masterfade from './pages/Masterfade.jsx';
import Capitulos from  './pages/Capitulos.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Masterfade" element={<Masterfade />} />
        <Route path="/masterfade/:id" element={<Capitulos />} />
      </Routes>
    </Router>
  );
}

export default App;
