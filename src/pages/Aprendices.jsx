import '../App.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import useUserStore from '../store/users'; // Zustand
import SupportButton from '../components/SupportButton';

function Coaches() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profiles, setProfiles] = useState([]);         // ✅ Perfiles (coaches)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Zustand
  const user = useUserStore((state) => state.user);
  const setUserData = useUserStore((state) => state.setUserData);
  const clearUserData = useUserStore((state) => state.clearUserData);
  const showProfile = useUserStore((state) => state.showProfile);
  const setShowProfile = useUserStore((state) => state.setShowProfile);

  const API_BASE_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://opencoaching-back-tlfh.onrender.com'
      : 'http://localhost:5000';

  // Cargar info de usuario
  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (token && email) {
      axios
        .post(`${API_BASE_URL}/api/search/users`, { email }, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
          setUserData(res.data);
          if (res.data.nombre) localStorage.setItem('nombre', res.data.nombre);
        })
        .catch((err) => {
          console.error('Error fetching user data:', err);
        });
    }
  }, [navigate, API_BASE_URL, setUserData]);

  // Reset modal perfil
  useEffect(() => {
    setShowProfile(false);
  }, [setShowProfile]);

  // ✅ Traer perfiles (coaches)
  useEffect(() => {
    setLoading(true);
    setError('');
    axios
      .get(`${API_BASE_URL}/api/profiles?page=1&limit=100`)
      .then((res) => {
        const data = res.data;
        const items = Array.isArray(data) ? data : (data.items || []);
        setProfiles(items);
      })
      .catch((err) => {
        console.error('Error fetching profiles:', err);
        setError('No se pudieron cargar los coaches.');
      })
      .finally(() => setLoading(false));
  }, [API_BASE_URL]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('nombre');
    clearUserData();
    navigate('/');
  };

  // UI helpers
  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setIsMenuOpen(false);
  };
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // CTA WhatsApp
  const phoneNumber = "+59891640623";
  const message = "Hola, quiero estar visible como coach en OpenCoaching.";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="h-full w-screen flex flex-col items-center bg-fixed bg-cover bg-center">
      <Navbar
        toggleProfile={toggleProfile}
        handleLogout={handleLogout}
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
      />
      <SupportButton />

      {/* Subtitle */}
      <div className="w-full text-center px-4 py-6 bg-gray-50">
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
Tu proceso de coaching es 100% gratis. Elegí el aprendiz y reservá en menos de 1 minuto.        </p>
      </div>

      {/* Modal perfil de usuario */}
      {showProfile && user && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-90 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-1/2 relative z-60">
            <button onClick={toggleProfile} className="absolute top-2 right-2 text-black text-2xl font-bold">
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
            <p><strong>Nombre:</strong> {user.nombre}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Cursos Adquiridos:</strong></p>
            <ul className="list-disc list-inside">
              {(user.cursos || []).map((curso, index) => (
                <li key={index}>{curso}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="w-full max-w-6xl px-4 mt-10 mb-3 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Coaches en formacion</h1>
          <p className="text-gray-600">Conocé a los coaches disponibles en OpenCoaching.</p>
        </div>
        {/* ✅ CTA persistente */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all">
            Quiero estar visible como Coach
          </button>
        </a>
      </div>

      {/* Estado de carga / error */}
      {loading && (
        <div className="min-h-[30vh] grid place-items-center w-full">
          <p className="text-gray-600">Cargando coaches…</p>
        </div>
      )}
      {!loading && error && (
        <div className="min-h-[30vh] grid place-items-center w-full">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Grid de coaches */}
      {!loading && !error && (
        <div className="w-full max-w-6xl px-4 pb-20">
          {profiles.length === 0 ? (
            <div className="min-h-[30vh] grid place-items-center">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Próximamente</h2>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <button className="px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all">
                    Quiero estar visible como Coach
                  </button>
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {profiles
  .filter((p) => p.title === "Aprendiz en formación") // ✅ Filtrar solo aprendices
  .map((p) => {

                const id = p.id || p._id;
                return (
                  <div key={id} className="bg-white rounded-xl shadow p-4 flex flex-col">
                    <div className="flex items-center gap-4">
                      <img
                        src={p.photo || 'https://via.placeholder.com/160?text=Coach'}
                        alt={p.name}
                        className="w-24 h-24 aspect-square rounded-lg object-cover object-left-top"
                      />
                      <div>
                        <h3 className="text-lg font-semibold leading-tight">{p.name}</h3>
<div className="flex items-center gap-1 text-sm text-gray-600">
  <span>{p.title}</span>
  {/* Badge verificado estilo Meta */}
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4"
    aria-label="Verificado"
    role="img"
  >
    <circle cx="12" cy="12" r="10" className="fill-[#1877F2]" />
    <path
      d="M8 12l2.5 2.5L16 9"
      className="stroke-white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mt-3 line-clamp-3">{p.description}</p>
                    <div className="mt-auto pt-4">
                      <Link
                        to={`/landing/${id}`}
                        className="inline-block w-full text-center px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold"
                      >
                    Agendá tu primera sesion gratis ahora
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Coaches;
