import '../App.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import useUserStore from '../store/users'; // Importar el store de Zustand

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
    ? 'https://back-cursos.onrender.com'
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

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "black", // Color de WhatsApp
          color: "#fff",
          padding: "10px 15px",
          borderRadius: "50px",
          textDecoration: "none",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontWeight: "bold",
          fontSize: "16px",
          zIndex: 1000,
        }}
      >
        <img
          src="https://i.postimg.cc/7hnwLYTy/customer-service-support-svgrepo-com.png"
          alt="WhatsApp"
          style={{ width: "28px", height: "28px" }}
        />
        Soporte
      </a>
   
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

      {/* Contenedor de los cursos */}
        {/* Tarjetas de los cursos */}
        
<h1>hola</h1>
      <div className=" h-auto w-full sm:w-11/12 rounded-xl sm:rounded-2xl flex flex-col items-center p-8 shadow-lg">
        {/* Tarjetas de los cursos */}
     
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full shadow-1xl">

            {courses.map((course, index) => (
  // Solo muestra el curso si no es "Bonus" o si es "Bonus" pero el usuario tiene acceso
  (course.courseTitle )    && (
    <div key={index} className="bg-black/90 rounded-lg shadow-lg p-6 flex flex-col items-center justify-between items-center"
    style={{ minHeight: "40rem", maxHeight: "50rem" }}
    >
      <img
        src={course.image}
        alt={course.courseTitle}
        className="w-full h-full max-w-[320px] max-h-[320px] rounded-lg shadow-md mb-4"
      />

      <h3 className="text-white text-2xl font-bold mb-4">{course.courseTitle}</h3>
  
      <p className="text-white font-bold mb-4">{course.courseDescription}</p>

     



    </div>
  )
))}


        </div>
      </div>
    </div>
  );
}

export default Coaches;