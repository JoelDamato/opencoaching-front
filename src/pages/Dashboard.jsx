import '../App.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import useUserStore from '../store/users'; // Importar el store de Zustand
import SupportButton from '../components/SupportButton';

function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [courses, setCourses] = useState([]); // Estado para almacenar los cursos
  const navigate = useNavigate();

  // Obtener el estado del usuario y el perfil desde Zustand
  const user = useUserStore((state) => state.user);
  const setUserData = useUserStore((state) => state.setUserData);
  const clearUserData = useUserStore((state) => state.clearUserData);
  const showProfile = useUserStore((state) => state.showProfile);
  const setShowProfile = useUserStore((state) => state.setShowProfile);


  // Determinar la URL base en función del entorno
  const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://opencoaching-back.onrender.com'
    : 'http://localhost:5000';

  useEffect(() => {
    // Verificar si hay un token almacenado
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
        // Guardar los datos del usuario en el estado global con Zustand
        setUserData(response.data);

        // Guardar el nombre del usuario en localStorage
        if (response.data.nombre) {
          localStorage.setItem('nombre', response.data.nombre);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    } else {
      console.error('No email found in localStorage');
    }
  }, [navigate, API_BASE_URL, setUserData]);

  // Restablecer el estado del perfil al montar el componente
  useEffect(() => {
    setShowProfile(false);
  }, [setShowProfile]);

  // Obtener los cursos desde la API
  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/courses/getcourses`)
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, [API_BASE_URL]);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('nombre'); // Limpiar el nombre del usuario
    clearUserData(); // Limpiar los datos del usuario en Zustand
    navigate('/');
  };

  // Función para verificar si el usuario tiene un curso específico
  const hasCourse = (courseTitle) => {
    return user?.cursos?.includes(courseTitle);
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

  // Función para sanitizar el título del curso y convertirlo en un slug seguro para URL
  const sanitizeCourseTitle = (title) => {
    return title.replace(/\s+/g, '-').toLowerCase();
  };



  return (
<div className="h-full w-screen flex flex-col items-center bg-fixed bg-cover bg-center">
  {/* Navbar */}
  <Navbar
    toggleProfile={toggleProfile}
    handleLogout={handleLogout}
    toggleMenu={toggleMenu}
    isMenuOpen={isMenuOpen}
  />

<SupportButton />

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

  {/* Onboarding de Open Coaching */}
  
{/* Bienvenida a Open Coaching */}
<div className="w-full max-w-3xl bg-white p-10 mt-10 rounded-2xl shadow-xl text-center">
  <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
    ¡Bienvenido a Open Coaching! 🚀
  </h1>
  <p className="text-gray-600 text-lg sm:text-xl mb-6">
    Nos alegra tenerte en esta comunidad. Aquí vas a encontrar herramientas, cursos y acompañamiento para transformar tu desarrollo personal y profesional.
  </p>

  <div className="text-left text-gray-700 text-base sm:text-lg space-y-4">
    <p>✅ Actualizá tu perfil para personalizar tu experiencia.</p>
    <p>📚 Accedé a tus cursos desde la sección <strong>“Cursos”</strong>.</p>
    <p>🎥 Participá de sesiones en vivo y entrenamientos especiales.</p>
    <p>🌟 Aprovechá recursos y bonus exclusivos solo por ser parte.</p>
  </div>

  <button
  onClick={() => window.open('https://chat.whatsapp.com/GGMk9DYLiowBjJWxMhdAOW', '_blank')}
  className="bg-green-500 mt-2 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition duration-300 transform hover:scale-105"
>
  Ingresa a la comunidad
</button>

  <p className="mt-8 text-sm text-gray-400">Estás listo para comenzar. Explorá libremente la plataforma.</p>
</div>



</div>

  );
}

export default Dashboard;