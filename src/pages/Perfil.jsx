import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SupportButton from "../components/SupportButton";

export default function PerfilPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Buscar datos en localStorage al montar
  useEffect(() => {
    const storedUser = {
      nombre: localStorage.getItem("nombre"),
      email: localStorage.getItem("email"),
    };

    if (!storedUser.nombre || !storedUser.email) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsMenuOpen(false); // podés ajustarlo si tenés modal

  if (!user) return null; // o un loading si querés mostrarlo

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
            <p className="font-semibold">{user.nombre}</p>
          </div>

          <div className="mb-4">
            <p className="text-gray-300 mb-1">Email:</p>
            <p className="font-semibold">{user.email}</p>
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
