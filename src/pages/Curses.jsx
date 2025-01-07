import '../App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Curses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const phoneNumber = "+59891640623"; // Número de WhatsApp

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
        <p
        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }} 
        className="absolute bottom-5 text-shadow text-white font-bold text-center text-2xl sm:text-4xl px-4">
           Los barberos no nacen, se forman.
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
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="#fff"
    style={{ width: "28px", height: "28px" }}
  >
    <path d="M16 0C7.16 0 0 7.16 0 16c0 2.82.74 5.44 2.02 7.74L0 32l8.5-2.22C11.01 31.26 13.45 32 16 32c8.84 0 16-7.16 16-16S24.84 0 16 0zm8.26 23.43c-.37.95-2.18 1.88-3.04 1.97-.8.07-1.56.37-5.3-1.13-4.47-1.85-7.3-6.43-7.53-6.73-.22-.3-1.8-2.37-1.8-4.53 0-2.16 1.14-3.22 1.56-3.67.42-.45.93-.57 1.23-.57h.9c.3 0 .66-.06 1.03.78.37.84 1.3 3.1 1.4 3.32.11.22.18.5.04.8-.14.3-.2.48-.4.74-.2.27-.42.6-.6.8-.2.2-.4.42-.18.82.22.4 1 1.63 2.13 2.64 1.46 1.3 2.67 1.7 3.07 1.92.4.2.65.17.9-.1.26-.28 1.04-1.2 1.32-1.6.28-.4.56-.34.93-.2.37.14 2.35 1.1 2.75 1.3.4.2.66.3.76.46.1.17.1 1.02-.26 1.97z" />
  </svg>
  <div style={{ textAlign: "center", fontSize: "12px", lineHeight: "14px" }}>
    Resuelve <br /> tus dudas
  </div>
</a>

      <div className="bg-gradient-to-r from-black/60 to-black/50 h-auto w-full sm:w-11/12  flex flex-col items-center p-8 shadow-lg">
      <p 
        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}
        className=" text-shadow text-white font-bold text-center text-2xl sm:text-2xl px-4 mb-4">
           Bienvenidos a la academia online de barberos mas grande de habla hispana
        </p>
      <p className=" bg-white rounded-lg text-black font-bold text-center text-lh sm:text-lg px-4 mb-2">
           Conoce todos mis cursos
        </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full shadow-1xl">
  {courses.length > 0 ? (
    courses
      .filter(course => course.courseTitle !== "REGALO DE LANZAMIENTO") // Filtrar cursos
      .map((course, index) => (
        <div
        key={index}
        className="bg-black/90 rounded-lg shadow-lg p-6 flex flex-col items-center justify-between h-full"
      >
        <img
          src={course.image}
          alt={course.courseTitle}
          className="w-full h-full max-w-[320px] max-h-[320px] rounded-lg shadow-md mb-4"
        />
        <h3 className="text-white text-2xl font-bold mb-4 text-center">
          {course.courseTitle}
        </h3>
        <p className="text-white font-bold mb-4 text-center">{course.courseDescription}</p>
        <a
          href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
            "Hola, me interesa más información sobre el curso: " + course.courseTitle
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition flex items-center gap-2 mt-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="#fff"
            style={{ width: "28px", height: "28px" }}
          >
            <path d="M16 0C7.16 0 0 7.16 0 16c0 2.82.74 5.44 2.02 7.74L0 32l8.5-2.22C11.01 31.26 13.45 32 16 32c8.84 0 16-7.16 16-16S24.84 0 16 0zm8.26 23.43c-.37.95-2.18 1.88-3.04 1.97-.8.07-1.56.37-5.3-1.13-4.47-1.85-7.3-6.43-7.53-6.73-.22-.3-1.8-2.37-1.8-4.53 0-2.16 1.14-3.22 1.56-3.67.42-.45.93-.57 1.23-.57h.9c.3 0 .66-.06 1.03.78.37.84 1.3 3.1 1.4 3.32.11.22.18.5.04.8-.14.3-.2.48-.4.74-.2.27-.42.6-.6.8-.2.2-.4.42-.18.82.22.4 1 1.63 2.13 2.64 1.46 1.3 2.67 1.7 3.07 1.92.4.2.65.17.9-.1.26-.28 1.04-1.2 1.32-1.6.28-.4.56-.34.93-.2.37.14 2.35 1.1 2.75 1.3.4.2.66.3.76.46.1.17.1 1.02-.26 1.97z" />
          </svg>
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
