import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import useUserStore from '../store/users'; // Ajusta la ruta según la ubicación del archivo userStore

function Cursos() {

  const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://back-cursos.onrender.com'
  : 'http://localhost:5000';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Obtener el estado del usuario y el perfil desde Zustand
  const user = useUserStore((state) => state.user);
  const setUserData = useUserStore((state) => state.setUserData);
  const clearUserData = useUserStore((state) => state.clearUserData);
  const showProfile = useUserStore((state) => state.showProfile);
  const setShowProfile = useUserStore((state) => state.setShowProfile);
  const { cursoId } = useParams();

  const [course, setCourse] = useState(null);

  const sanitizeTitle = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
  };
  

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Fetch para obtener todos los cursos desde la API
        const response = await fetch(`${API_BASE_URL}/api/courses/getcourses`);
        const data = await response.json();
        // Filtrar el curso especifico según el cursoId recibido desde la URL
        const selectedCourse = data.find(course => course.courseTitle.toLowerCase().replace(/\s+/g, '-') === cursoId);
        setCourse(selectedCourse);
      } catch (error) {
        console.error("Error al obtener el curso:", error);
      }
    };

    if (cursoId) {
      fetchCourseData();
    }
  }, [cursoId]);

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

  if (!course) {
    return <div className="text-white">Cargando curso...</div>;
  }

  return (
    <div className="h-full w-screen bg-gradient-to-r from-blue-950 to-blue-800 flex flex-col items-center">
      <Navbar
        toggleProfile={toggleProfile}
        handleLogout={handleLogout}
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
      />
      <h1 className="pt-5 text-4xl font-bold mb-6 text-white text-shadow-xl">
        {course.courseTitle}
      </h1>

      <div className=" h-auto w-full sm:w-11/12 rounded-xl sm:rounded-2xl flex flex-col items-center p-8 shadow-lg">
      

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {course.chapters.map((chapter, index) => (
            <div key={index} className="bg-gradient-to-l from-blue-950 to-blue-800 rounded-lg shadow-lg p-6 flex flex-col items-center">
              <h3 className="text-2xl text-white font-bold mb-4">{chapter.title}</h3>
              <iframe
                src={chapter.video}
                className="w-full h-40 mb-4 rounded-lg"
                allow="autoplay"
                title={`Vista previa del video de ${chapter.title}`}
              ></iframe>
              <p className="text-gray-700 mb-4 text-white">{chapter.description}</p>
              <button 
                onClick={() => navigate(`/cursos/${sanitizeTitle(course.courseTitle)}/${index + 1}`)}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                Ver Capítulo
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Link to="/Dashboard">
            <button className="bg-black text-white py-2 px-4 rounded-lg">Regresar al Dashboard</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cursos;
