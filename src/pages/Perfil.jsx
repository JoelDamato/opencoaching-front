import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/users"; // tu store Zustand
import Navbar from '../components/Navbar';
import SupportButton from '../components/SupportButton';

export default function PerfilPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [courses, setCourses] = useState([]); // Estado para almacenar los cursos
    const showProfile = useUserStore((state) => state.showProfile);
    const setShowProfile = useUserStore((state) => state.setShowProfile);
  
  
    // Determinar la URL base en función del entorno
    const API_BASE_URL = process.env.NODE_ENV === 'production'
      ? 'https://opencoaching-back.onrender.com'
      : 'http://localhost:5000';
  
  

  
    // Función para mostrar/ocultar el perfil
    const toggleProfile = () => {
      setShowProfile(!showProfile);
      setIsMenuOpen(false);
    };
  
    // Función para mostrar/ocultar el menú (en móvil)
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const clearUserData = useUserStore((state) => state.clearUserData);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    clearUserData();
    navigate("/");
  };

  return (
<>
    <Navbar
    toggleProfile={toggleProfile}
    handleLogout={handleLogout}
    toggleMenu={toggleMenu}
    isMenuOpen={isMenuOpen}
  />

<SupportButton />
    <div className="min-h-screen bg-black text-white py-10 px-6 flex justify-center">
      <div className="bg-neutral-900 w-full max-w-xl rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Mi Perfil</h1>

        <div className="mb-4">
          <p className="text-gray-300 mb-1">Nombre:</p>
          <p className="font-semibold">{user?.nombre ?? "No especificado"}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-300 mb-1">Email:</p>
          <p className="font-semibold">{user?.email ?? "No especificado"}</p>
        </div>

    
        <div className="mt-6 flex flex-col gap-4">
          <button
            onClick={() => navigate("/Password")}
            className="text-sm text-blue-400 hover:text-blue-600 transition underline"
          >
            Cambiar Contraseña
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
