import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar({ handleLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://back-cursos.onrender.com'
    : 'http://localhost:5000';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (token && email) {
      axios.post(`${API_BASE_URL}/api/search/users`, { email }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setUser(response.data);
        localStorage.setItem('rol', response.data.rol);
      })
      .catch(error => console.error('Error fetching user data:', error));
    }
  }, [navigate, API_BASE_URL]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      {/* Navbar Horizontal */}
      <nav className="bg-[#09886d] text-white fixed top-0 left-0 w-full z-50 shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer hover:opacity-80"
            onClick={() => handleNavigation('/Dashboard')}
          >
            <img src="/nav.png" alt="Logo OPCH" className="h-10" />
          </div>

          {/* Menú Principal (Desktop) */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <button 
                onClick={() => handleNavigation('/Dashboard')}
                className={`hover:bg-[#39ac71] px-3 py-2 rounded-lg ${location.pathname === '/Dashboard' ? 'font-bold' : ''}`}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavigation('/Coaches')}
                className={`hover:bg-[#39ac71] px-3 py-2 rounded-lg ${location.pathname === '/Coaches' ? 'font-bold' : ''}`}
              >
                Coaches
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavigation('/cursostotals')}
                className={`hover:bg-[#39ac71] px-3 py-2 rounded-lg ${location.pathname === '/cursostotals' ? 'font-bold' : ''}`}
              >
                Cursos
              </button>
            </li>
            {user?.rol === 'admin' && (
              <li>
                <button 
                  onClick={() => handleNavigation('/PanelControl')}
                  className={`hover:bg-[#39ac71] px-3 py-2 rounded-lg ${location.pathname === '/PanelControl' ? 'font-bold' : ''}`}
                >
                  Panel de Control
                </button>
              </li>
            )}
          </ul>

          {/* Menú de Usuario (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => setShowProfile(true)}
              className="flex items-center hover:bg-[#39ac71] px-3 py-2 rounded-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Perfil
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center hover:bg-red-600 px-3 py-2 rounded-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Salir
            </button>
          </div>

          {/* Botón de Menú Móvil */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setShowProfile(!showProfile)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Menú Móvil (Dropdown) */}
        {showProfile && (
          <div className="md:hidden bg-[#09886d] py-2 px-4">
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation('/Dashboard')}
                  className="w-full text-left hover:bg-[#39ac71] px-3 py-2 rounded-lg"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/Coaches')}
                  className="w-full text-left hover:bg-[#39ac71] px-3 py-2 rounded-lg"
                >
                  Coaches
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/cursostotals')}
                  className="w-full text-left hover:bg-[#39ac71] px-3 py-2 rounded-lg"
                >
                  Cursos
                </button>
              </li>
              {user?.rol === 'admin' && (
                <li>
                  <button 
                    onClick={() => handleNavigation('/PanelControl')}
                    className="w-full text-left hover:bg-[#39ac71] px-3 py-2 rounded-lg"
                  >
                    Panel de Control
                  </button>
                </li>
              )}
              <li>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left hover:bg-red-600 px-3 py-2 rounded-lg flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Modal de Perfil (igual que tu versión original) */}
      {showProfile && user && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-black/95 w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-lg relative">
            <button onClick={() => setShowProfile(false)} className="absolute top-3 right-3 text-white focus:outline-none">
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-white">Perfil del Usuario</h2>
            <p className="text-white"><strong>Nombre:</strong> {user?.nombre ?? 'No especificado'}</p>
            <p className="text-white"><strong>Email:</strong> {user?.email ?? 'No especificado'}</p>
            <p className="text-white"><strong>Cursos Adquiridos:</strong></p>
            <ul className="list-disc list-inside text-white">
              {user?.cursos?.length > 0 ? user.cursos.map((curso, index) => (
                <li key={index}>{curso}</li>
              )) : <li>Ninguno</li>}
            </ul>
            <button 
              onClick={() => handleNavigation('/Perfil')} 
              className="text-blue-500 text-sm mt-4 hover:text-blue-800"
            >
              Cambiar Contraseña
            </button>
          </div>
        </div>
      )}

      {/* Espacio para el contenido debajo del navbar */}
      <div className="pt-16"></div>
    </>
  );
}

export default Navbar;