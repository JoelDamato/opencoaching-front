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
import PricingPage from './pages/Precios.jsx'; 
import Aprendices from './pages/Aprendices.jsx';
import Landingpage from './pages/Landing.jsx';
import Cliente from './pages/Clientes.jsx';
import Lanzamiento from './pages/Lanzamiento.jsx';
import Formulario from './pages/Formulariodecarga.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* páginas estáticas */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/panelcontrol" element={<PanelControl />} />
        <Route path="/password" element={<Password />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/vsl" element={<Vsl />} />
        <Route path="/coaches" element={<Coaches />} />
        <Route path="/cursostotals" element={<Totalcursos />} />
        <Route path="/preguntas" element={<Preguntas />} />
        <Route path="/triadflow" element={<Triadflow />} />
        <Route path="/politicas" element={<Politicas />} />
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/novedades" element={<Novedades />} />
        <Route path="/asistente" element={<Asistente />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/aprendices" element={<Aprendices />} />
        <Route path="/cliente" element={<Cliente />} />
        <Route path="/lanzamiento" element={<Lanzamiento />} />
        <Route path="/formulario" element={<Formulario />} />

        {/* cursos (evitar colisión con /:handle) */}
        <Route path="/curso/:cursoId" element={<Cursos />} />
        <Route path="/curso/:cursoId/:moduleName/:chapterId" element={<Capitulos />} />
        <Route path="/landing/:id" element={<Landingpage />} />

      </Routes>
    </Router>
  );
}

export default App;
