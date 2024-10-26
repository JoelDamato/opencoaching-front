import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar({ toggleMenu, isMenuOpen, handleLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const Dashboard = location.pathname === '/Dashboard';
  const PanelControl = location.pathname === '/PanelControl';

  const [user, setUser] = useState(null); // Estado local para almacenar los datos del usuario
  const [showProfile, setShowProfile] = useState(false); // Estado local para manejar la visibilidad del modal de perfil

  const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://back-cursos.onrender.com'
    : 'http://localhost:5000';

  // Llamada a la API para obtener los datos del usuario al montar el Navbar
  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (!token) {
      // Si no hay token, redirigir a la página de login
      navigate('/');
    } else if (email) {
      // Fetch user data from API enviando el email en la solicitud POST
      axios.post(`${API_BASE_URL}/api/search/users`, { email: email }, {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token si es necesario
        }
      })
      .then(response => {
        // Guardar los datos del usuario en el estado local
        console.log('Datos del usuario obtenidos desde la API:', response.data);
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        navigate('/'); // Opcional: redirigir si hay error
      });
    } else {
      console.error('No email found in localStorage');
    }
  }, [navigate, API_BASE_URL]);

  // Manejar la navegación y cerrar el menú si está abierto
  const handleNavigation = (path) => {
    navigate(path);
    if (isMenuOpen && toggleMenu) {
      toggleMenu();
    }
  };

  // Función para mostrar/ocultar el perfil del usuario
  const handleToggleProfile = () => {
    if (isMenuOpen && toggleMenu) {
      toggleMenu(); // Cerrar el menú
    }
    setShowProfile(!showProfile); // Cambiar visibilidad del modal del perfil del usuario
  };

  return (
    <>
      <nav className="w-full bg-blue-900 text-white flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold">Erick Gomez Academy</h1>
        <div className="hidden sm:flex gap-4">
        {!Dashboard && (
            <button onClick={() => handleNavigation('/Dashboard')} className="bg-yellow-600 py-2 px-4 rounded-lg">
              Dashboard
            </button>
          )}
          <button onClick={handleToggleProfile} className="bg-blue-600 py-2 px-4 rounded-lg">
            Mi Perfil
          </button>
          {user?.rol === 'admin' && !PanelControl && (
            <button onClick={() => handleNavigation('/PanelControl')} className="bg-green-600 py-2 px-4 rounded-lg">
              Panel de Control
            </button>
          )}
          <button onClick={handleLogout} className="bg-red-600 py-2 px-4 rounded-lg">
            Cerrar Sesión
          </button>
         
        </div>
        {/* Menú hamburguesa para móviles */}
        <div className="sm:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg>
          </button>
        </div>
        {/* Menú desplegable para móviles */}
        {isMenuOpen && (
          <div className="fixed top-0 right-0 w-2/3 h-full bg-black bg-opacity-90 z-40 flex flex-col items-start p-6">
            <button onClick={toggleMenu} className="self-end mb-4 text-white focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {!Dashboard && (
              <button onClick={() => handleNavigation('/Dashboard')} className="text-white text-lg mb-4">
              Dashboard
              </button>
            )}
            <button onClick={handleToggleProfile} className="text-white text-lg mb-4">
              Mi Perfil
            </button>
            {user?.rol === 'admin' && !PanelControl && (
  <button onClick={() => handleNavigation('/PanelControl')} className="text-white text-lg mb-4">
    Panel de Control
  </button>
)}
          <button onClick={handleLogout} className="text-white text-lg">
              Cerrar Sesión
            </button>
          </div>
        )}
      </nav>

      {/* Modal del Perfil del Usuario */}
      {showProfile && user && (
        <div className="fixed inset-0 bg-white bg-opacity-55 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-lg relative">
            <button onClick={handleToggleProfile} className="absolute top-3 right-3 text-black focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4">Perfil del Usuario</h2>
            <div className="mb-2">
              <strong>Nombre:</strong> {user?.nombre ?? 'No especificado'}
            </div>
            <div className="mb-2">
              <strong>Email:</strong> {user?.email ?? 'No especificado'}
            </div>
            <div className="mb-2">
              <strong>Cursos Adquiridos:</strong> {user?.cursos && user?.cursos.length > 0 ? (
                <ul className="list-disc list-inside">
                  {user.cursos.map((curso, index) => (
                    <li key={index}>{curso}</li>
                  ))}
                </ul>
              ) : 'Ninguno'}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
