import '../App.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import useUserStore from '../store/users'; // Importar el store de Zustand
const CoursesList = () => {

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

  const phoneNumber = "+59891640623"; // Reemplaza con tu número de WhatsApp en formato internacional
  const message = "Hola, tengo una consulta!."; // Mensaje predefinido opcional

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <>
    <Navbar
    toggleProfile={toggleProfile}
    handleLogout={handleLogout}
    toggleMenu={toggleMenu}
    isMenuOpen={isMenuOpen}
  />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
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

     
      <button
                    onClick={() => navigate(`/${sanitizeCourseTitle(course.courseTitle)}`)}
                    className="bg-black text-white py-2 px-4 rounded-lg hover:bg-black/90 transition"
                  >
                    Ver Curso
                  </button>


    </div>
  )
))}

    </div>
    </>
  );
};


export default CoursesList;
