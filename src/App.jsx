import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Cursos from './pages/Cursos.jsx';
import PanelControl from './pages/Panel.jsx';
import Capitulos from './pages/Capitulos.jsx';
import Certificados from './pages/Certificados.jsx';

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
      </Routes>
    </Router>
  );
}

export default App;
