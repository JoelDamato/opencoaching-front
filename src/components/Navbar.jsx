import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar({ toggleMenu, isMenuOpen, handleLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const Dashboard = location.pathname === '/Dashboard';
  const PanelControl = location.pathname === '/PanelControl';

  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://back-cursos.onrender.com'
    : 'http://localhost:5000';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (token && email) {
      axios.post(`${API_BASE_URL}/api/search/users`, { email: email }, {
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
    setMenuOpen(false);
  };

  const handleToggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <>
      {/* Navbar */}
      <nav className={`text-white fixed top-0 left-0 w-auto h-auto px-4 py-2 z-50 transition-all duration-300 ${menuOpen ? 'bg-[#09886d] md:h-full md:w-64' : 'bg-transparent'}`}>
        {/* Logo con botón de despliegue */}
        <div className="flex items-center cursor-pointer " onClick={() => setMenuOpen(!menuOpen)}>
          <img src="/nav.png" alt="Logo OPCH" className="w-16 h-auto md:w-[10rem]" />
          <span className={`text-xl  transform transition-transform duration-300  ${menuOpen ? 'rotate-180' : 'rotate-0'}`}>     <svg className="animate-pulse "xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
</svg>
</span>
        </div>

        {/* Menú (oculto por defecto) */}
        <ul className={`transition-all  duration-300 flex flex-col items-start w-full overflow-hidden ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 hidden'}`}>          
          {!Dashboard && (
            <li className="my-1 ">
              <button onClick={() => handleNavigation('/Dashboard')} className="text-white text-2xl py-2 px-4 w-full hover:bg-[#39ac71] rounded-2xl flex items-center">
                Dashboard
              </button>
            </li>
          )}
          <li className="my-1">
            <button onClick={() => handleNavigation('/Coaches')} className="text-white text-2xl py-2 px-4 w-full hover:bg-[#39ac71] rounded-2xl flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>
  Coaches
            </button>
          </li>
          
          <li className="my-1">
            <button onClick={() => handleNavigation('/cursostotals')} className="text-white text-2xl py-2 px-4 w-full hover:bg-[#39ac71] rounded-2xl flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
</svg>
 Cursos
            </button>
          </li>
          {user?.rol === 'admin' && !PanelControl && (
            <li className="my-1">
              <button onClick={() => handleNavigation('/PanelControl')} className="text-white text-2xl py-2 px-4 w-full hover:bg-[#39ac71] rounded-2xl flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
</svg>
Panel de Control
              </button>
            </li>
          )}
          <li className="my-1">
            <button onClick={handleToggleProfile} className="text-white text-2xl py-2 px-4 w-full hover:bg-[#39ac71] rounded-2xl flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
 Mi Perfil
            </button>
          </li>
          <li className="my-1">
            <button onClick={handleLogout} className="text-white text-2xl py-2 px-4 w-full hover:bg-[#39ac71] rounded-2xl flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
 Cerrar Sesión
            </button>
          </li>
        </ul>
      </nav>

      {/* Espaciado del contenido */}
      <div className="md:ml-64 p-6 w-full">
        {/* Modal del Perfil del Usuario */}
        {showProfile && user && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-black/95 w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-lg relative">
              <button onClick={handleToggleProfile} className="absolute top-3 right-3 text-white focus:outline-none">
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
              <button onClick={() => handleNavigation('/Perfil')} className="text-blue-500 text-sm mt-4 hover:text-blue-800">
                Cambiar Contraseña
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
