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
import VerificarIPs from './components/VerificarIP'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><VerificarIPs /><Home /></>} />
        <Route path="/Dashboard" element={<><VerificarIPs /><Dashboard /></>} />
        <Route path="/PanelControl" element={<><VerificarIPs /><PanelControl /></>} />
        <Route path="/:cursoId" element={<><VerificarIPs /><Cursos /></>} />
        <Route path="/cursos/:cursoId/:chapterId" element={<><VerificarIPs /><Capitulos /></>} />
        <Route path="/Certificados" element={<><VerificarIPs /><Certificados /></>} />
        <Route path="/Certificadoscuty" element={<><VerificarIPs /><Certificadoscuty /></>} />
        <Route path="/Perfil" element={<><VerificarIPs /><Perfil /></>} />
        <Route path="/Regalo" element={<><VerificarIPs /><Regalo /></>} />
      </Routes>
    </Router>
  );
}

export default App;
