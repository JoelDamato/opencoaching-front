import '../App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Curses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const phoneNumber = "123456789"; // Número de WhatsApp

  const API_BASE_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://back-cursos.onrender.com'
      : 'http://localhost:5000';

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/courses/getcourses`)
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, [API_BASE_URL]);

  return (
    <div className="h-full w-screen flex flex-col items-center" style={{ backgroundImage: "url('https://i.ibb.co/fGZCrFh/FONDO-BARBER.jpg')" }}>
        <div className="relative flex flex-col items-center">
        {/* Imagen inferior (fondo) */}
        <img
            src="https://i.ibb.co/hy7tRTP/ERICK.webp"
            alt="Fondo"
            className="w-full max-w-md sm:max-w-lg rounded-lg"
        />


        {/* Texto centrado y superpuesto */}
        <p className="absolute bottom-10 text-white font-bold text-center text-2xl sm:text-4xl px-4">
            Un barbero no nace, se hace.
        </p>
        </div>


      <a
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "black",
          color: "#fff",
          padding: "10px 15px",
          borderRadius: "50px",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontWeight: "bold",
          zIndex: 1000,
        }}
      >
        <img
          src="https://i.postimg.cc/7hnwLYTy/customer-service-support-svgrepo-com.png"
          alt="WhatsApp"
          style={{ width: "28px", height: "28px" }}
        />
        Mas info
      </a>
      <div className="bg-gradient-to-r from-black/60 to-black/50 h-auto w-full sm:w-11/12  flex flex-col items-center p-8 shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full shadow-1xl">
  {courses.length > 0 ? (
    courses
      .filter(course => course.courseTitle !== "REGALO DE LANZAMIENTO") // Filtrar cursos
      .map((course, index) => (
        <div key={index} className="bg-black/90 rounded-lg shadow-lg p-6 flex flex-col items-center">
          <img
            src={course.image}
            alt={course.courseTitle}
            className="w-full h-full max-w-[320px] max-h-[320px] rounded-lg shadow-md mb-4"
          />
          <h3 className="text-white text-2xl font-bold mb-4">{course.courseTitle}</h3>
          <p className="text-white font-bold mb-4">{course.courseDescription}</p>
          <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
              "Hola, me interesa más información sobre el curso: " + course.courseTitle
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
          >
            Obtener ahora
          </a>
        </div>
      ))
  ) : (
    <p className="text-white text-xl">Cargando cursos...</p>
  )}
</div>

      </div>
    </div>
  );
}

export default Curses;
