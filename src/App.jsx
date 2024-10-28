import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Cursos from './pages/Cursos.jsx';
import PanelControl from './pages/Panel.jsx';
import CapitulosMaster from  './pages/CapitulosMasterfade.jsx';
import CapitulosFocus from  './pages/CapitulosFocus.jsx';
import CapitulosCutting from  './pages/CapitulosCutting.jsx';
import Certificados from './pages/Certificados.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/PanelControl" element={<PanelControl />} />
        <Route path="/Dashboard/:cursoId" element={<Cursos/>} />
        <Route path="/masterfade/:id" element={<CapitulosMaster />} />
        <Route path="/focus/:id" element={<CapitulosFocus />} />
        <Route path="/cuttingmastery/:id" element={<CapitulosCutting/>} />
        <Route path="/Certificados" element={<Certificados />} />
      </Routes>
    </Router>
  );
}

export default App;
