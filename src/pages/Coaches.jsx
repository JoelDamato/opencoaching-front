import '../App.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import useUserStore from '../store/users'; // Importar el store de Zustand
import SupportButton from '../components/SupportButton';

function Coaches() {
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
    ? 'https://opencoaching-back-tlfh.onrender.com'
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

  const phoneNumber = "+59891640623"; // Reemplaza con tu número de WhatsApp en formato internacional
  const message = "Hola, tengo una consulta!."; // Mensaje predefinido opcional

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  

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

<div className="w-full sm:w-11/12 p-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {[
  
   
      {
        src: 'Enzo.jpg',
        nombre: 'Enzo Chiapello',
        link: 'https://calendly.com/enzochiapello/sesion-de-coaching-solidario',
      },
      {
        src: 'Fabiana.jpg',
        nombre: 'Fabiana',
        link: 'https://calendly.com/faadrover/sesion-de-coaching',
      },
      {
        src: 'Mariabeatriz.jpg',
        nombre: 'María Beatriz',
        link: 'https://calendly.com/mariabecoach10sesion/sesion-de-coaching?month=2025-02',
      },
      {
        src: 'PaulaRepetto.jpg',
        nombre: 'Paula Repetto',
        link: 'https://calendly.com/pau-repetto1/45min',
      },
   
    ].map((coach, idx) => (
      <div
        key={idx}
        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center p-4"
      >
        <img
          src={coach.src}
          alt={coach.nombre}
          className="w-full h-64 object-contain rounded-md mb-4"
        />
        <h3 className="text-lg font-semibold text-center mb-2">{coach.nombre}</h3>

        {coach.link ? (
          <a
            href={coach.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-transform duration-300 transform hover:-translate-y-1"
          >
            Reservá tu sesión
          </a>
        ) : (
          <span className="text-sm text-gray-400 italic mt-2">Próximamente disponible</span>
        )}
      </div>
    ))}
  </div>
</div>


    </div>
  );
}

export default Coaches;