import '../App.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import useUserStore from '../store/users'; // Importar el store de Zustand

function Certificados() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [certificadoUrl, setCertificadoUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
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
      // Si no hay token, redirigir a la página de login
      navigate('/');
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
        // Generar el certificado automáticamente
        generateCertificate(response.data.nombre);
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

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    clearUserData(); // Limpiar los datos del usuario en Zustand
    navigate('/');
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

  // Función para generar y descargar el certificado
  const generateCertificate = (userName) => {
    if (!userName) {
      console.error('El usuario no tiene un nombre definido');
      return;
    }
    
    axios.post(`${API_BASE_URL}/api/certificado/generate-image`, {
      name: userName,
      imageUrl: 'https://i.ibb.co/wCWc3Vs/f524d28a-a7ff-4c86-a90c-4d384ea7e20a.jpg'
    }, {
      responseType: 'blob',
    })
    .then(response => {
      const url = URL.createObjectURL(new Blob([response.data]));
      setCertificadoUrl(url);
    })
    .catch(error => {
      console.error('Error generating certificate:', error);
    });
  };

  // Función para abrir el modal con la imagen ampliada
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };



  return (
    <div className="h-screen w-screen bg-gradient-to-b from-blue-900 to-black  flex flex-col items-center">
      {/* Navbar */}
      <Navbar
        toggleProfile={toggleProfile}
        handleLogout={handleLogout}
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
      />

      {/* Cartel de felicitaciones */}
      {user && user.nombre && (
        <div className="bg-gradient-to-b from-blue-900 to-black p-6 rounded-lg shadow-lg mt-10">
          <h2 className="text-3xl font-bold text-blue-800">Felicitaciones, {user.nombre}!</h2>
          <p className="text-lg mt-2">Has completado el curso con éxito.</p>
        </div>
      )}

      {/* Mostrar el certificado generado */}
      {certificadoUrl && (
        <div className="mt-10">
          <img 
            src={certificadoUrl} 
            alt="Certificado" 
            className="w-196 h-auto rounded-lg shadow-xl cursor-pointer" 
            onClick={openModal} // Abrir modal al hacer clic en la imagen
          />
        </div>
      )}

      {/* Botón para descargar el certificado */}
      {certificadoUrl && (
        <div className="mt-6 flex flex-col items-center">
          <a href={certificadoUrl} download="certificado.png" className="bg-green-600 text-white py-2 px-4 rounded-lg mb-4">
            Descargar Certificado
          </a>

        </div>
      )}

      {/* Modal para mostrar la imagen ampliada */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <img 
              src={certificadoUrl} 
              alt="Certificado ampliado" 
              className="w-full max-w-3xl h-auto rounded-lg shadow-xl"
            />
            <button 
              className="absolute top-4 right-4 text-white bg-red-600 rounded-full p-2" 
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Certificados;
