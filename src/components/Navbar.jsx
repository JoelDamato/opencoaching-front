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
        localStorage.setItem('rol', response.data.rol);
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

 

  const [timeLeft, setTimeLeft] = useState('');
  const [isLaunched, setIsLaunched] = useState(false);

  useEffect(() => {
    // Function to calculate remaining time
    const calculateTimeRemaining = () => {
      const targetDate = new Date('2024-12-13T09:00:00-03:00');
      const now = new Date();
      
      // Get time difference in milliseconds
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0 ) {
        setTimeLeft('DISPONIBLE GROWTH BARBER');
        setIsLaunched(true);
        return false;
      }
      
      // Calculate time units
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      // Format time string in Spanish
      setTimeLeft(`Inscripciones abiertas en: ${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`);
      return true;
    };

    // Calculate immediately
    const shouldContinue = calculateTimeRemaining();
    
    // Only set up interval if countdown should continue
    let interval;
    if (shouldContinue) {
      interval = setInterval(calculateTimeRemaining, 1000);
    }

    // Cleanup function
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);


const handleWhatsAppClick = () => {
  // Número de teléfono y mensaje predefinido (reemplaza con tu número real)
  const phoneNumber = "59891640623";
  const message = "Quiero obtener el **GROWTH BARBER**";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Abrir WhatsApp en una nueva pestaña
  window.open(whatsappUrl, '_blank');
};

  



// Función para mostrar/ocultar el perfil del usuario
const handleToggleProfile = () => {
  if (isMenuOpen && toggleMenu) {
    toggleMenu(); // Cerrar el menú si está abierto
  }
  setShowProfile(!showProfile); // Cambiar la visibilidad del modal del perfil
};


  return (
    <>
  
  <nav className="w-full bg-black text-white flex items-center justify-between px-6 py-4 mb-4 shadow-2xl border-b border-gray-500 sticky top-0 z-50">
        <div className="flex items-center gap-2">
        <img src="https://i.postimg.cc/NF4pMWsn/cold-smooth-tasty-removebg-preview.png" alt="Logo Erick Gomez Academy" style={{ width: '6rem', height: '6rem' }} className="h-auto" />
          <div>
          <p className="text-white mt-2 p-2 text-sm sm:text-lg">{timeLeft}</p>
          <div className="flex justify-center">
  {isLaunched && (
    <button
      onClick={handleWhatsAppClick}
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mt-2 flex items-center gap-2"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-3 w-3" 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>
      OBTENER
    </button>
  )}
</div>


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
               <div>
            {/* Contador del lanzamiento */}
            
          </div>
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
