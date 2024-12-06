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

    } else if (email) {
      // Fetch user data from API enviando el email en la solicitud POST
      axios.post(`${API_BASE_URL}/api/search/users`, { email: email }, {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token si es necesario
        }
      })
      .then(response => {

        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
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
      <nav className="w-full bg-black text-white flex items-center justify-between px-6 py-4 mt-2 mb-4 shadow-2xl rounded-2xl">
        <div className="flex items-center gap-2">
        <img src="https://i.ibb.co/GpQ6Lkw/cold-smooth-tasty-removebg-preview.png" alt="Logo Erick Gomez Academy" style={{ width: '6rem', height: '6rem' }} className="h-auto" />
          <div>
          </div>
        </div>
        <div className="hidden sm:flex gap-4">
          <button onClick={handleToggleProfile} className="text-white py-2 px-4 rounded-lg hover:bg-blue-800 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
            
            Mi Perfil
          </button>
          {!Dashboard && (
            <button onClick={() => handleNavigation('/Dashboard')} className="text-white py-2 px-4 rounded-lg hover:bg-blue-800 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              
              Dashboard
            </button>
          )}
          {user?.rol === 'admin' && !PanelControl && (
            <button onClick={() => handleNavigation('/PanelControl')} className="text-white py-2 px-4 rounded-lg hover:bg-blue-800 flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
              
              Panel de Control
            </button>
          )}
          <button onClick={handleLogout} className="text-white py-2 px-4 rounded-lg hover:bg-blue-800 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
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
          <div className="fixed top-0 right-0 w-2/3 h-full bg-black bg-opacity-95 z-40 flex flex-col items-start p-6">
            <button onClick={toggleMenu} className="self-end mb-4 text-white focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col w-full gap-4">
              <button onClick={handleToggleProfile} className="text-white text-lg hover:bg-blue-800 flex items-center gap-2 border-b border-white pb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
                Mi Perfil
              </button>
              {!Dashboard && (
                <button onClick={() => handleNavigation('/Dashboard')} className="text-white text-lg hover:bg-blue-800 flex items-center gap-2 border-b border-white pb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                  Dashboard
                </button>
              )}
              {user?.rol === 'admin' && !PanelControl && (
                <button onClick={() => handleNavigation('/PanelControl')} className="text-white text-lg hover:bg-blue-800 flex items-center gap-2 border-b border-white pb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                  </svg>
                  Panel de Control
                </button>
              )}
              <button onClick={handleLogout} className="text-white text-lg hover:bg-blue-800 flex items-center gap-2 border-b border-white pb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                </svg>
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Modal del Perfil del Usuario */}
      {showProfile && user && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-black/95 w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-lg relative">
            <button onClick={handleToggleProfile} className="absolute top-3 right-3 text-white focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4 text-white">Perfil del Usuario</h2>
    
            <div className="mb-2 text-white">
              <strong>Nombre:</strong> {user?.nombre ?? 'No especificado'}
            </div>
            <div className="mb-2 text-white">
              <strong>Email:</strong> {user?.email ?? 'No especificado'}
            </div>
            <div className="mb-2 text-white">
              <strong>Cursos Adquiridos:</strong> {user?.cursos && user?.cursos.length > 0 ? (
                <ul className="list-disc list-inside">
                  {user.cursos.map((curso, index) => (
                    <li key={index}>{curso}</li>
                  ))}
                </ul>
              ) : 'Ninguno'}
          
            </div>
            <button onClick={() => handleNavigation('/Perfil')} className="text-blue-500 text-s hover:text-blue-800 flex items-center gap-2 p-1 m-1 pb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                  </svg>
                  Cambiar Contraseña
                </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
