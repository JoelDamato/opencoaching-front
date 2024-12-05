import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Cursos from './pages/Cursos.jsx';
import PanelControl from './pages/Panel.jsx';
import Capitulos from './pages/Capitulos.jsx';
import Certificados from './pages/Certificados.jsx';
import Certificadoscuty from './pages/Certificadoscuty.jsx';
import Perfil from './pages/Perfil.jsx';
import Regalo from './pages/Regalo.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/PanelControl" element={<PanelControl />} />
        <Route path="/:cursoId" element={<Cursos />} />
        <Route path="/cursos/:cursoId/:chapterId" element={<Capitulos />} />
        <Route path="/Certificados" element={<Certificados />} />
        <Route path="/Certificadoscuty" element={<Certificadoscuty />} />
        <Route path="/Perfil" element={<Perfil />} />
        <Route path="/Regalo" element={<Regalo />} />
      </Routes>
    </Router>
  );
}

export default App;
