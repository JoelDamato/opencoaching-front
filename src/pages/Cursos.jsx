import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import useUserStore from '../store/users';

function Cursos() {
  const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://opencoaching-back-tlfh.onrender.com'
    : 'http://localhost:5000';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
  const clearUserData = useUserStore((state) => state.clearUserData);
  const showProfile = useUserStore((state) => state.showProfile);
  const setShowProfile = useUserStore((state) => state.setShowProfile);
  const { cursoId } = useParams();

  const [course, setCourse] = useState(null);

  const sanitizeTitle = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
  };

  const groupChaptersByModule = (chapters) => {
    return chapters.reduce((acc, chapter) => {
      const { module } = chapter;
      if (!acc[module]) acc[module] = [];
      acc[module].push(chapter);
      return acc;
    }, {});
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/courses/getcourses`);
        const data = await response.json();
        const selectedCourse = data.find(course => sanitizeTitle(course.courseTitle) === cursoId);
        if (selectedCourse) {
          const modules = groupChaptersByModule(selectedCourse.chapters);
          setCourse({ ...selectedCourse, modules });
        }
      } catch (error) {
        console.error("Error al obtener el curso:", error);
      }
    };
    if (cursoId) fetchCourseData();
  }, [cursoId]);

  useEffect(() => {
    setShowProfile(false);
  }, [setShowProfile]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    clearUserData();
    navigate('/');
  };

  if (!course) {
    return <div className="text-center text-gray-700 py-10">Cargando curso...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <Navbar
        toggleProfile={() => setShowProfile(!showProfile)}
        handleLogout={handleLogout}
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
      />

      <div className="w-full max-w-6xl mt-8 px-6 sm:px-8">
        <div className="flex flex-col items-center text-center mb-10">
          <img src={course.image} alt={course.courseTitle} className="w-28 h-28 object-cover rounded-lg mb-4 shadow-md" />
          <h1 className="text-3xl font-bold text-gray-800">{course.courseTitle}</h1>
        </div>

        {Object.entries(course.modules).map(([moduleName, chapters], moduleIndex) => (
          <div key={moduleIndex} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center border-b border-gray-200 pb-2">
              Módulo: {moduleName}
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 justify-center">
              {chapters.map((chapter, chapterIndex) => (
                <div
                  key={chapterIndex}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col  hover:shadow-xl transition relative"
                  style={{ minHeight: "16rem" }}
                >
                  <div className="flex items-center ">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 font-bold text-lg">
                      {chapterIndex + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                      {chapter.title}
                    </h3>
                  </div>

      
                  <button
                    onClick={() =>
                      navigate(`/cursos/${sanitizeTitle(course.courseTitle)}/${moduleName}/${chapterIndex + 1}`)
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg mt-auto transition"
                  >
                    Ver Capítulo
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-center mt-8">
          <Link to="/Dashboard">
            <button className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-6 rounded-lg transition">
              Regresar al Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cursos;
