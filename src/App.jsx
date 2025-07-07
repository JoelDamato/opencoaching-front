import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Cursos from './pages/Cursos.jsx';
import PanelControl from './pages/Panel.jsx';
import Capitulos from './pages/Capitulos.jsx';
import Password from './pages/Password.jsx';
import Vsl from './pages/Vsl.jsx';
import Totalcursos from './pages/Cursostotals.jsx';
import Coaches from './pages/Coaches.jsx';
import HomePage from './pages/HomePage.jsx';
import Perfil from './pages/Perfil.jsx';
import Preguntas from "./pages/Preguntas.jsx";
import Politicas from './pages/Politicas.jsx';
import Terminos from './pages/Terminos.jsx';
import Triadflow from './pages/TriadFlow.jsx';
import Novedades from './pages/Novedades.jsx';
import Asistente from './pages/Asistente.jsx';
import PricingPage from './pages/Precios.jsx'; // 👈 Agregado

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<><HomePage /></>} />
        <Route path="/Login" element={<><Login /></>} />
        <Route path="/Dashboard" element={<><Dashboard /></>} />
        <Route path="/PanelControl" element={<><PanelControl /></>} />
        <Route path="/:cursoId" element={<><Cursos /></>} />
        <Route path="/cursos/:cursoId/:moduleName/:chapterId" element={<><Capitulos /></>} />
        <Route path="/Password" element={<><Password /></>} />
        <Route path="/Perfil" element={<><Perfil /></>} />
        <Route path="/Vsl" element={<><Vsl /></>} />
        <Route path="/Coaches" element={<><Coaches /></>} />
        <Route path="/cursostotals" element={<><Totalcursos /></>} />
        <Route path="/preguntas" element={<><Preguntas /></>} />
        <Route path="/triadflow" element={<Triadflow />} />
        <Route path="/politicas" element={<Politicas />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/novedades" element={<Novedades />} />
        <Route path="/asistente" element={<Asistente />} />
        <Route path="/pricing" element={<PricingPage />} /> {/* 👈 Nueva ruta */}

      </Routes>
    </Router>
  );
}

export default App;
