import '../App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import useUserStore from '../store/users'; // Importar el store de Zustand

function PanelControl() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cursos, setCursos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [userData, setUserData] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [activeSection, setActiveSection] = useState('crear');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Obtener el estado `showProfile` y las funciones de Zustand
  const showProfile = useUserStore((state) => state.showProfile);
  const setShowProfile = useUserStore((state) => state.setShowProfile);
  const clearUserData = useUserStore((state) => state.clearUserData);

  const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://back-cursos.onrender.com'
    : 'http://localhost:5000';

  // Restablecer el estado del perfil al montar el componente
  useEffect(() => {
    setShowProfile(false);
    fetchUsuarios();
  }, [setShowProfile]);

  // Obtener la lista de usuarios
  const fetchUsuarios = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users`);
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    clearUserData(); // Limpiar los datos del usuario en Zustand
    navigate('/');
  };

  // Función para mostrar/ocultar el perfil del usuario usando Zustand
  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setIsMenuOpen(false);
  };

  // Función para mostrar/ocultar el menú de navegación en dispositivos móviles
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Función para crear un usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/create/register`, {
        nombre,
        email,
        password,
        cursos,
        rol: 'user',
      });

      if (response.status === 201) {
        setUserData({ nombre, email, password, cursos });
        setSuccessMessage('Usuario creado exitosamente.');
        fetchUsuarios(); // Actualizar la lista de usuarios
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  // Función para manejar la selección de cursos
  const handleCursoChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCursos([...cursos, value]);
    } else {
      setCursos(cursos.filter((curso) => curso !== value));
    }
  };

  // Función para editar un usuario
  const handleEditUser = async (userId) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/users/${userId}`, {
        nombre,
        email,
        cursos,
      });
      if (response.status === 200) {
        setSuccessMessage('Usuario actualizado exitosamente.');
        fetchUsuarios();
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  // Función para eliminar un usuario
  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/users/${userId}`);
      if (response.status === 200) {
        setSuccessMessage('Usuario eliminado exitosamente.');
        fetchUsuarios();
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-blue-950 to-blue-800 flex flex-col items-center">
      {/* Navbar */}
      <Navbar
        toggleProfile={toggleProfile}
        handleLogout={handleLogout}
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
      />

      {/* Modal para mostrar el perfil del usuario */}
      {showProfile && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-90 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-1/2 relative z-60">
            <button onClick={toggleProfile} className="absolute top-2 right-2 text-black text-2xl font-bold">
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
            <p><strong>Nombre:</strong> {nombre}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Cursos Adquiridos:</strong> {cursos.join(', ')}</p>
          </div>
        </div>
      )}

      {/* Panel de Control Title */}
      <h1 className="text-4xl font-bold mb-6 text-white text-shadow-xl mt-6">Panel de Control</h1>

      {/* Mini navegador */}
      <div className="bg-white w-full sm:w-11/12 rounded-xl sm:rounded-2xl flex justify-center p-4 shadow-lg mb-8">
        <button className={`mx-4 px-4 py-2 rounded ${activeSection === 'crear' ? 'bg-blue-700 text-white' : 'bg-gray-200'}`} onClick={() => setActiveSection('crear')}>Crear</button>
        <button className={`mx-4 px-4 py-2 rounded ${activeSection === 'editar' ? 'bg-blue-700 text-white' : 'bg-gray-200'}`} onClick={() => setActiveSection('editar')}>Editar</button>
        <button className={`mx-4 px-4 py-2 rounded ${activeSection === 'eliminar' ? 'bg-blue-700 text-white' : 'bg-gray-200'}`} onClick={() => setActiveSection('eliminar')}>Eliminar</button>
      </div>

      {/* Sección activa */}
      {activeSection === 'crear' && (
        <div className="bg-white h-auto w-full sm:w-11/12 rounded-xl sm:rounded-2xl flex flex-col items-center p-8 shadow-lg">
          <form className="flex flex-col w-full items-center gap-5" onSubmit={handleSubmit}>
            {/* Formulario de creación de usuario */}
            <div className="w-4/5">
              <label className="block text-black font-semibold tracking-wide mb-2">
                Nombre:
                <input
                  className="w-full h-12 sm:h-16 bg-gray-200 rounded-lg px-4"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="w-4/5">
              <label className="block text-black font-semibold tracking-wide mb-2">
                Email:
                <input
                  className="w-full h-12 sm:h-16 bg-gray-200 rounded-lg px-4"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="w-4/5">
              <label className="block text-black font-semibold tracking-wide mb-2">
                Contraseña:
                <input
                  className="w-full h-12 sm:h-16 bg-gray-200 rounded-lg px-4"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="w-4/5">
              <label className="block text-black font-semibold tracking-wide mb-2">
                Cursos:
                <div className="flex flex-col mt-2">
                  <label>
                    <input
                      type="checkbox"
                      value="Focus"
                      checked={cursos.includes('Focus')}
                      onChange={handleCursoChange}
                    />{' '}
                    Focus
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Master Fade"
                      checked={cursos.includes('Master Fade')}
                      onChange={handleCursoChange}
                    />{' '}
                    Master Fade
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Cutting Mastery"
                      checked={cursos.includes('Cutting Mastery')}
                      onChange={handleCursoChange}
                    />{' '}
                    Cutting Mastery
                  </label>
                </div>
              </label>
            </div>

            <button
              className="bg-black rounded-2xl w-4/5 sm:h-20 sm:w-3/5 h-16 tracking-wide text-3xl text-white"
              type="submit"
            >
              Crear Usuario
            </button>
          </form>
        </div>
      )}

      {activeSection === 'editar' && (
        <div className="bg-white h-auto w-full sm:w-11/12 rounded-xl sm:rounded-2xl flex flex-col items-center p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Editar Usuario</h2>
          <div className="w-full">
            <ul>
              {usuarios.map((usuario) => (
                <li key={usuario.id} className="mb-4">
                  <div className="flex justify-between items-center">
                    <span>{usuario.nombre} - {usuario.email}</span>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => {
                        setSelectedUserId(usuario.id);
                        setNombre(usuario.nombre);
                        setEmail(usuario.email);
                        setCursos(usuario.cursos);
                        setActiveSection('editarForm');
                      }}
                    >
                      Editar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeSection === 'editarForm' && selectedUserId && (
        <div className="bg-white h-auto w-full sm:w-11/12 rounded-xl sm:rounded-2xl flex flex-col items-center p-8 shadow-lg">
          <form className="flex flex-col w-full items-center gap-5" onSubmit={() => handleEditUser(selectedUserId)}>
            {/* Formulario de edición de usuario */}
            <div className="w-4/5">
              <label className="block text-black font-semibold tracking-wide mb-2">
                Nombre:
                <input
                  className="w-full h-12 sm:h-16 bg-gray-200 rounded-lg px-4"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="w-4/5">
              <label className="block text-black font-semibold tracking-wide mb-2">
                Email:
                <input
                  className="w-full h-12 sm:h-16 bg-gray-200 rounded-lg px-4"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="w-4/5">
              <label className="block text-black font-semibold tracking-wide mb-2">
                Cursos:
                <div className="flex flex-col mt-2">
                  <label>
                    <input
                      type="checkbox"
                      value="Focus"
                      checked={cursos.includes('Focus')}
                      onChange={handleCursoChange}
                    />{' '}
                    Focus
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Master Fade"
                      checked={cursos.includes('Master Fade')}
                      onChange={handleCursoChange}
                    />{' '}
                    Master Fade
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Cutting Mastery"
                      checked={cursos.includes('Cutting Mastery')}
                      onChange={handleCursoChange}
                    />{' '}
                    Cutting Mastery
                  </label>
                </div>
              </label>
            </div>

            <button
              className="bg-blue-700 rounded-2xl w-4/5 sm:h-20 sm:w-3/5 h-16 tracking-wide text-3xl text-white"
              type="submit"
            >
              Actualizar Usuario
            </button>
          </form>
        </div>
      )}

      {activeSection === 'eliminar' && (
        <div className="bg-white h-auto w-full sm:w-11/12 rounded-xl sm:rounded-2xl flex flex-col items-center p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Eliminar Usuario</h2>
          <div className="w-full">
            <ul>
              {usuarios.map((usuario) => (
                <li key={usuario.id} className="mb-4">
                  <div className="flex justify-between items-center">
                    <span>{usuario.nombre} - {usuario.email}</span>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleDeleteUser(usuario.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-500 text-white w-full sm:w-11/12 rounded-xl p-4 mt-4">
          {successMessage}
        </div>
      )}
    </div>
  );
}

export default PanelControl;
