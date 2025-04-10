import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar({ handleLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://back-cursos.onrender.com'
    : 'http://localhost:5000';

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (token && email) {
      axios.post(`${API_BASE_URL}/api/search/users`, { email }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setUser(res.data);
        localStorage.setItem("rol", res.data.rol);
      })
      .catch(err => console.error("Error fetching user:", err));
    }
  }, [API_BASE_URL]);

  const navigateTo = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const menuItems = [
    { name: "Dashboard", path: "/Dashboard" },
    { name: "Coaches", path: "/Coaches" },
    { name: "Cursos", path: "/cursostotals" },
  ];

  if (user?.rol === "admin") {
    menuItems.push({ name: "Panel de Control", path: "/PanelControl" });
  }

  return (
    <>
      <nav className="bg-[#0c0c0c] text-white fixed top-0 left-0 w-full z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigateTo("/Dashboard")}
          >
            <img src="/nav.png" alt="OpenCoaching" className="h-10" />
            <span className="font-bold text-lg">Open<span className="text-green-400">Coaching</span></span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {menuItems.map(({ name, path }) => (
              <button
                key={name}
                onClick={() => navigateTo(path)}
                className={`transition px-3 py-2 rounded-md hover:bg-green-700/20 ${
                  location.pathname === path ? "text-green-400 font-semibold" : "text-white"
                }`}
              >
                {name}
              </button>
            ))}
            <a
              href="/perfil"
              className="text-white hover:text-green-400 transition px-3 py-2"
            >
              Perfil
            </a>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-md text-sm"
            >
              Salir
            </button>
          </div>

          {/* Mobile button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#0c0c0c] border-t border-gray-800 px-4 pb-4">
            <ul className="flex flex-col gap-3 pt-4">
              {menuItems.map(({ name, path }) => (
                <li key={name}>
                  <button
                    onClick={() => navigateTo(path)}
                    className={`block w-full text-left px-3 py-2 rounded-md hover:bg-green-700/20 ${
                      location.pathname === path ? "text-green-400 font-semibold" : "text-white"
                    }`}
                  >
                    {name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigateTo("/perfil")}
                  className="block w-full text-left px-3 py-2 rounded-md hover:bg-green-700/20"
                >
                  Perfil
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
                >
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      <div className="pt-16" /> {/* Espacio debajo del navbar */}
    </>
  );
}
