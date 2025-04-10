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
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm shadow-sm w-full">
        <div className="flex h-20 items-center justify-between px-4 md:px-6 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo("/Dashboard")}>
            <img src="/nav.png" alt="OpenCoaching" className="h-10" />
            <span className="text-xl font-bold">
              Open<span className="text-green-600">Coaching</span>
            </span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map(({ name, path }) => (
              <button
                key={name}
                onClick={() => navigateTo(path)}
                className={`text-sm font-medium transition-colors hover:text-green-600 ${
                  location.pathname === path ? "text-green-600 font-semibold" : "text-gray-800"
                }`}
              >
                {name}
              </button>
            ))}

            <button
              onClick={() => navigateTo("/perfil")}
              className="text-sm font-medium text-gray-800 hover:text-green-600 transition"
            >
              Perfil
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-600 text-white text-sm px-5 py-2.5 rounded-full font-medium transition-all hover:bg-red-700"
            >
              Salir
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-green-50 text-green-600 transition hover:bg-green-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden w-full bg-white border-t border-gray-100 shadow-lg animate-fadeIn">
            <nav className="flex flex-col space-y-4 p-6">
              {menuItems.map(({ name, path }) => (
                <button
                  key={name}
                  onClick={() => navigateTo(path)}
                  className={`text-sm font-medium text-left px-4 py-2 rounded-md transition hover:bg-green-50 ${
                    location.pathname === path ? "text-green-600 font-semibold" : "text-gray-800"
                  }`}
                >
                  {name}
                </button>
              ))}

              <button
                onClick={() => navigateTo("/perfil")}
                className="text-sm text-left px-4 py-2 text-gray-800 hover:text-green-600 transition"
              >
                Perfil
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium transition hover:bg-red-700"
              >
                Cerrar sesión
              </button>
            </nav>
          </div>
        )}
      </header>

      <div className="pt-2" /> {/* Espacio para contenido debajo del navbar */}
    </>
  );
}
