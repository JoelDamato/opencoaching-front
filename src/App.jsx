import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Cursos from './pages/Cursos.jsx';
import Capitulos from  './pages/Capitulos.jsx';
import PanelControl from './pages/Panel.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/PanelControl" element={<PanelControl />} />
        <Route path="/Dashboard/:cursoId" element={<Cursos/>} />
        <Route path="/masterfade/:id" element={<Capitulos />} />
      </Routes>
    </Router>
  );
}

export default App;
