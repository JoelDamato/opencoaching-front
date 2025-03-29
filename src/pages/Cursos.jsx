import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import Navbar from '../components/Navbar';
import useUserStore from '../store/users';

function Cursos() {
  const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://opencoaching-back.onrender.com/'
    : 'http://localhost:5000';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Obtener el estado del usuario y el perfil desde Zustand
  const user = useUserStore((state) => state.user);
  const clearUserData = useUserStore((state) => state.clearUserData);
  const showProfile = useUserStore((state) => state.showProfile);
  const setShowProfile = useUserStore((state) => state.setShowProfile);
  const { cursoId } = useParams();

  const [course, setCourse] = useState(null);

  const sanitizeTitle = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
  };

  // Función para agrupar capítulos por módulo
  const groupChaptersByModule = (chapters) => {
    return chapters.reduce((acc, chapter) => {
      const { module } = chapter;
      if (!acc[module]) {
        acc[module] = [];
      }
      acc[module].push(chapter);
      return acc;
    }, {});
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // Fetch para obtener todos los cursos desde la API
        const response = await fetch(`${API_BASE_URL}/api/courses/getcourses`);
        const data = await response.json();
        // Filtrar el curso específico según el cursoId recibido desde la URL
        const selectedCourse = data.find(course => sanitizeTitle(course.courseTitle) === cursoId);

        if (selectedCourse) {
          // Agrupar capítulos por módulos
          const modules = groupChaptersByModule(selectedCourse.chapters);
          setCourse({ ...selectedCourse, modules });
        }
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

  if (!course) {
    return <div className="text-white">Cargando curso...</div>;
  }

  return (
<div
  className="h-full w-screen flex flex-col items-center bg-fixed bg-cover bg-center"
  style={{
    backgroundImage: "url('https://i.ibb.co/fGZCrFh/FONDO-BARBER.jpg')",
  }}
>      <Navbar
        toggleProfile={() => setShowProfile(!showProfile)}
        handleLogout={handleLogout}
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
      />

      <div className="h-auto w-full sm:w-11/12 rounded-xl sm:rounded-2xl flex flex-col items-center p-8 shadow-lg">
        <img src={course.image} alt={course.courseTitle} className="w-40 h-40 rounded-lg mb-4 pb-5" />

        {Object.entries(course.modules).map(([moduleName, chapters], moduleIndex) => (
          <div key={moduleIndex} className="mb-8 w-full">
<h2
  className="text-4xl font-extrabold text-white shadow-lg mb-6 text-center rounded-lg tracking-wider bg-gradient-to-r from-black/0 via-black to-black/0"
>

  Módulo: {moduleName}
</h2>

<div className="flex flex-wrap justify-center gap-6">
{chapters.map((chapter, chapterIndex) => (
  <div
    key={chapterIndex}
    className="bg-gradient-to-r from-black/80 to-black rounded-lg shadow-lg p-6 flex flex-col items-center justify-between h-96 w-72"
    style={{ minHeight: "26rem", maxHeight: "30rem" }} // Fija el tamaño de la tarjeta
  >
    <h3
      className="text-xl text-white font-bold mb-2 text-center"
      style={{ minHeight: "6rem", maxHeight: "6rem", overflow: "hidden" }} // Ajusta la altura del título
    >
      {chapter.title}
    </h3>

    <ReactPlayer
      url={chapter.video}
      width="100%"
      height="150px"
      muted={true}
      controls={false}
      playing={false}
      className="mb-2 rounded-lg"
    />

    <div
      className="flex-grow flex items-center justify-center"
      style={{
        minHeight: "4rem",
        maxHeight: "4rem",
        overflow: "hidden", // Oculta texto que exceda el límite
      }}
    >
      <p className="text-gray-300 text-sm text-center mb-4 line-clamp-3">
        {chapter.description}
      </p>
    </div>

    <button
      onClick={() =>
        navigate(
          `/cursos/${sanitizeTitle(course.courseTitle)}/${moduleName}/${chapterIndex + 1}`
        )
      }
      className="bg-black text-white py-2 px-4 rounded-lg hover:bg-blue-800"
    >
      Ver Capítulo
    </button>
  </div>
))}

</div>
          </div>
        ))}

        <div className="mt-6">
          <Link to="/Dashboard">
            <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-blue-800">
              Regresar al Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cursos;
