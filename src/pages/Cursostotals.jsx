import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import useUserStore from '../store/users';

const CoursesList = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Zustand store
  const user = useUserStore((state) => state.user);
  const setUserData = useUserStore((state) => state.setUserData);
  const clearUserData = useUserStore((state) => state.clearUserData);
  const showProfile = useUserStore((state) => state.showProfile);
  const setShowProfile = useUserStore((state) => state.setShowProfile);

  const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://opencoaching-back.onrender.com'
    : 'http://localhost:5000';

  // Fetch user data
  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (token && email) {
      axios.post(`${API_BASE_URL}/api/search/users`, { email }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setUserData(response.data);
        if (response.data.nombre) {
          localStorage.setItem('nombre', response.data.nombre);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
  }, [navigate, API_BASE_URL, setUserData]);

  // Fetch courses
  useEffect(() => {
    setIsLoading(true);
    axios.get(`${API_BASE_URL}/api/courses/getcourses`)
      .then(response => {
        setCourses(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
        setIsLoading(false);
      });
  }, [API_BASE_URL]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('nombre');
    clearUserData();
    navigate('/');
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const sanitizeCourseTitle = (title) => {
    return title.replace(/\s+/g, '-').toLowerCase();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar
          toggleProfile={toggleProfile}
          handleLogout={handleLogout}
          toggleMenu={toggleMenu}
          isMenuOpen={isMenuOpen}
        />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#39ac71]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar
        toggleProfile={toggleProfile}
        handleLogout={handleLogout}
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Nuestros Cursos</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Descubre nuestros programas de formación diseñados para impulsar tu crecimiento profesional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            (course.courseTitle) && (
              <div 
                key={index}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.courseTitle}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-white">{course.courseTitle}</h3>
                  </div>

                  <p className="text-gray-300 mb-6 line-clamp-3">{course.courseDescription}</p>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => navigate(`/${sanitizeCourseTitle(course.courseTitle)}`)}
                      className="bg-[#09886d] hover:bg-[#39ac71] text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
                    >
                      Ver Curso
                    </button>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">¿Tienes alguna duda?</h2>
          <a 
            href={`https://wa.me/59891640623?text=${encodeURIComponent("Hola, tengo una consulta sobre los cursos!")}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-6.29-3.51c.174.869.774 1.645 1.676 1.906.09.026.179.039.269.039.197 0 .383-.038.563-.111.52-.222.915-.629 1.133-1.139a2.13 2.13 0 00.103-1.384 2.118 2.118 0 00-.694-1.156 2.052 2.052 0 00-1.186-.45 2.11 2.11 0 00-1.57.694 2.2 2.2 0 00-.644 1.534c0 .233.033.462.097.677h.003zM12 22a9.965 9.965 0 01-5.33-1.545l-3.12 1.045 1.043-3.046A9.996 9.996 0 0112 2c5.523 0 10 4.477 10 10s-4.477 10-10 10z"/>
            </svg>
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default CoursesList;