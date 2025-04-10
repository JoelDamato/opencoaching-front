import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/users"; // tu store Zustand

export default function PerfilPage() {
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

        <div className="mb-4">
          <p className="text-gray-300 mb-1">Cursos Adquiridos:</p>
          {user?.cursos?.length > 0 ? (
            <ul className="list-disc list-inside text-sm text-white">
              {user.cursos.map((curso, index) => (
                <li key={index}>{curso}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">Aún no tenés cursos asignados.</p>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <button
            onClick={() => navigate("/cambiar-password")}
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
  );
}
