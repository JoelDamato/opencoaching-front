import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Cursos from './pages/Cursos.jsx';
import PanelControl from './pages/Panel.jsx';
import Capitulos from './pages/Capitulos.jsx';
import Password from './pages/Password.jsx';
import Regalo from './pages/Regalo.jsx';
import Vsl from './pages/Vsl.jsx';
import Totalcursos from './pages/Cursostotals.jsx'
import Coaches from './pages/Coaches.jsx'
import HomePage from './pages/HomePage.jsx'
import Perfil from './pages/Perfil.jsx'

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
        <Route path="/Regalo" element={<><Regalo /></>} />
        <Route path="/Vsl" element={<><Vsl /></>} />
        <Route path="/Coaches" element={<><Coaches /></>} />
        <Route path="/cursostotals" element={<><Totalcursos /></>} />
        
      </Routes>
    </Router>
  );
}

export default App;
