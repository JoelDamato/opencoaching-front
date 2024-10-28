import '../App.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import useUserStore from '../store/users'; // Importar el store de Zustand

function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Obtener el estado del usuario y el perfil desde Zustand
  const user = useUserStore((state) => state.user);
  const setUserData = useUserStore((state) => state.setUserData);
  const clearUserData = useUserStore((state) => state.clearUserData);
  const showProfile = useUserStore((state) => state.showProfile);
  const setShowProfile = useUserStore((state) => state.setShowProfile);

  // Determinar la URL base en función del entorno
  const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://back-cursos.onrender.com'
    : 'http://localhost:5000';

  useEffect(() => {
    // Verificar si hay un token almacenado
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
        // Guardar los datos del usuario en el estado global con Zustand
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        navigate('/'); // Opcional: redirigir si hay error
      });
    } else {
      console.error('No email found in localStorage');
    }
  }, [navigate, API_BASE_URL, setUserData]);

  // Restablecer el estado del perfil al montar el componente
  useEffect(() => {
    setShowProfile(false);
  }, [setShowProfile]);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    clearUserData(); // Limpiar los datos del usuario en Zustand
    navigate('/');
  };

  // Función para verificar si el usuario tiene un curso específico
  const hasCourse = (courseName) => {
    return user?.cursos?.includes(courseName);
  };

  // Función para mostrar/ocultar el perfil
  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setIsMenuOpen(false);
  };

  // Función para mostrar/ocultar el menú (en móvil)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-blue-950 to-blue-800 flex flex-col items-center">
      {/* Navbar */}
      <Navbar
        toggleProfile={toggleProfile}
        handleLogout={handleLogout}
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
      />

      {/* Modal para mostrar el perfil del usuario */}
      {showProfile && user && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-90 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-1/2 relative z-60">
            <button onClick={toggleProfile} className="absolute top-2 right-2 text-black text-2xl font-bold">
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
            <p><strong>Nombre:</strong> {user.nombre}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Cursos Adquiridos:</strong></p>
            <ul className="list-disc list-inside">
              {user.cursos.map((curso, index) => (
                <li key={index}>{curso}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Título del Dashboard */}
      <h1 className="text-4xl font-bold mb-6 text-white text-shadow-xl mt-10">Dashboard</h1>

      {/* Contenedor de los cursos */}
      <div className="bg-white h-auto w-full sm:w-11/12 rounded-xl sm:rounded-2xl flex flex-col items-center p-8 shadow-lg">
        <h2 className="flex justify-center text-black text-3xl tracking-wide font-bold py-4 sm:text-4xl">
          Mis Cursos
        </h2>

        {/* Tarjetas de los cursos */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
          {/* Curso Master Fade */}
          <div className="bg-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <img src="https://static-media.hotmart.com/t5z1vptNxASKG05RR5hoT0sWJ2I=/300x300/smart/filters:format(webp):background_color(white)/hotmart/product_pictures/6bbf43d8-5568-4130-ba5d-fc2abd6345ad/HOTMARTLOGOMF.jpg" alt="Master Fade" className="w-full h-auto rounded-lg shadow-md mb-4" />
            <h3 className="text-2xl font-bold mb-4">Curso de Master Fade 2.0</h3>
            <p className="text-gray-700 mb-4">Aprende las técnicas avanzadas de barbería.</p>
            <Link to={`/Dashboard/1`}>
              <button
                className={`${
                  hasCourse("Master Fade") ? "bg-blue-600 text-white" : "bg-gray-400 text-gray-500 cursor-not-allowed opacity-50"
                } py-2 px-4 rounded-lg`}
                disabled={!hasCourse("Master Fade")}
              >
                Ver Curso
              </button>
            </Link>
          </div>

          {/* Curso Focus */}
          <div className="bg-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <img src="https://static-media.hotmart.com/8oVC6TuSWy7l-3hZVi0dQ79GDLU=/300x300/smart/filters:format(webp):background_color(white)/hotmart/product_pictures/1a504a49-f92c-4012-9f26-a829e52943f8/efa4dcda01b643a885e2557cc27b43d9.jpg" alt="Focus" className="w-full h-auto rounded-lg shadow-md mb-4" />
            <h3 className="text-2xl font-bold mb-4">Curso de Focus</h3>
            <p className="text-gray-700 mb-4">Conviértete en un experto.</p>
            <Link to={`/Dashboard/2`}>
              <button
                className={`${
                  hasCourse("Focus") ? "bg-blue-600 text-white" : "bg-gray-400 text-gray-500 cursor-not-allowed opacity-50"
                } py-2 px-4 rounded-lg`}
                disabled={!hasCourse("Focus")}
              >
                Ver Curso
              </button>
            </Link>
          </div>

          {/* Curso Cutting Mastery */}
          <div className="bg-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <img src="https://static-media.hotmart.com/QgNQqIxbuWZocAtf9w0ddxVJGAY=/300x300/smart/filters:format(webp):background_color(white)/hotmart/product_pictures/9cd6b195-3481-4a65-ad2e-b3f5906070a3/LogoCursoCuttingMastery.jpg" alt="Cutting Mastery" className="w-full h-auto rounded-lg shadow-md mb-4" />
            <h3 className="text-2xl font-bold mb-4">Curso de Cutting Mastery</h3>
            <p className="text-gray-700 mb-4">Conoce las herramientas.</p>
            <Link to={`/Dashboard/3`}>
              <button
                className={`${
                  hasCourse("Cutting Mastery") ? "bg-blue-600 text-white" : "bg-gray-400 text-gray-500 cursor-not-allowed opacity-50"
                } py-2 px-4 rounded-lg`}
                disabled={!hasCourse("Cutting Mastery")}
              >
                Ver Curso
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
