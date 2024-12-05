import '../App.css';
import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal'; // Importar el componente Modal

function PanelControl() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cursos, setCursos] = useState([]);
  const [successMessage, setSuccessMessage] = useState(''); // Mensaje de éxito
  const [createdUser, setCreatedUser] = useState(null); // Guardar datos del usuario creado
  const [modalMessage, setModalMessage] = useState('');
  const [activeSection, setActiveSection] = useState('crear');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://back-cursos.onrender.com'
    : 'http://localhost:5000';

  // Función para manejar la creación de usuarios
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
        setSuccessMessage('Usuario creado exitosamente.');
        setCreatedUser({ email, password }); // Guardar los datos del usuario creado
        setNombre('');
        setEmail('');
        setPassword('');
        setCursos([]);
      }
    } catch (error) {
      setSuccessMessage('');
      setModalMessage(
        error.response?.data?.message || 'Error al registrar usuario: ' + error.message
      );
      setIsModalOpen(true);
    }
  };

  // Función para manejar cambios en los checkboxes de cursos
  const handleCursoChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCursos([...cursos, value]);
    } else {
      setCursos(cursos.filter((curso) => curso !== value));
    }
  };

  // Función para editar un usuario
  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = { cursos };
      if (nombre) dataToSend.nombre = nombre;
      const response = await axios.put(`${API_BASE_URL}/api/update/users/${email}`, dataToSend);

      if (response.status === 200) {
        setSuccessMessage('Usuario actualizado exitosamente.');
        setModalMessage('');
        setNombre('');
        setCursos([]);
      }
    } catch (error) {
      setSuccessMessage('');
      setModalMessage(
        error.response?.data?.message || 'Error al actualizar usuario: ' + error.message
      );
      setIsModalOpen(true);
    }
  };

  // Función para copiar al portapapeles
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copiado al portapapeles');
  };

  return (
    <div className="h-full w-screen bg-gradient-to-r from-blue-950 to-blue-800 flex flex-col items-center">
      {/* Navbar */}
      <Navbar />

      {/* Título del Panel */}
      <h1 className="text-4xl font-bold mb-6 text-white text-shadow-xl mt-6">Panel de Control</h1>

      {/* Navegación entre secciones */}
      <div className="bg-black w-50% sm:w-11/12 rounded-xl sm:rounded-2xl flex justify-center p-4 shadow-lg mb-1">
        <button
          className={`mx-4 px-4 py-2 rounded ${
            activeSection === 'crear' ? 'bg-blue-700 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveSection('crear')}
        >
          Crear Usuario
        </button>
        <button
          className={`mx-4 px-4 py-2 rounded ${
            activeSection === 'editar' ? 'bg-blue-700 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveSection('editar')}
        >
          Editar Usuario
        </button>
      </div>

      {/* Sección para crear usuario */}
      {activeSection === 'crear' && (
        <div className="h-auto w-full sm:w-11/12 rounded-xl sm:rounded-2xl flex flex-col items-center p-4 shadow-lg">
          <h2 className="text-2xl font-bold text-white">Crear Usuario</h2>
          <form className="flex flex-col w-full items-center gap-5" onSubmit={handleSubmit}>
            <div className="w-4/5">
              <label className="block text-white font-semibold tracking-wide mb-2">
                Nombre:
                <input
                  className="w-full h-12 text-black sm:h-16 bg-gray-200 rounded-lg px-4"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="w-4/5">
              <label className="block text-white font-semibold tracking-wide mb-2">
                Email:
                <input
                  className="w-full text-black h-12 sm:h-16 bg-gray-200 rounded-lg px-4"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="w-4/5">
              <label className="block text-white font-semibold tracking-wide mb-2">
                Contraseña:
                <input
                  className="w-full h-12 text-black sm:h-16 bg-gray-200 rounded-lg px-4"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="w-4/5">
              <label className="block text-white font-semibold tracking-wide mb-2">
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
              className="bg-white rounded-2xl w-4/5 sm:h-20 sm:w-3/5 h-16 tracking-wide text-3xl text-black"
              type="submit"
            >
              Crear Usuario
            </button>
          </form>

          {successMessage && (
            <div className="mt-6 bg-gray-900 p-4 rounded-xl shadow-lg text-white">
              <p className="text-xl font-bold mb-2">{successMessage}</p>
              {createdUser && (
                <>
                  <p>
                    Plataforma:{' '}
                    <a
                      href="https://plataforma.erickgomezacademy.com/"
                      className="text-blue-400 underline"
                    >
                      plataforma.erickgomezacademy.com
                    </a>
                  </p>
                  <p>Usuario: {createdUser.email}</p>
                  <p>Contraseña: {createdUser.password}</p>
                  <button
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    onClick={() =>
                      copyToClipboard(
                        `Usuario: ${createdUser.email}\nContraseña: ${createdUser.password}`
                      )
                    }
                  >
                    Copiar
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Sección para editar usuario */}
      {activeSection === 'editar' && (
        <div className="h-auto w-full sm:w-11/12 rounded-xl sm:rounded-2xl flex flex-col items-center p-4 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-white">Editar Usuario</h2>
          <form className="flex flex-col w-full items-center gap-5" onSubmit={handleEditUser}>
            <div className="w-4/5">
              <label className="block text-white font-semibold tracking-wide mb-2">
                Email del usuario a editar:
                <input
                  className="w-full text-black h-12 sm:h-16 bg-gray-200 rounded-lg px-4"
                  type="email"
                  value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="w-4/5">
                <label className="block text-white font-semibold tracking-wide mb-2">
                  Nombre:
                  <input
                    className="w-full text-black h-12 sm:h-16 bg-gray-200 rounded-lg px-4"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </label>
              </div>
              <div className="w-4/5">
                <label className="block text-white font-semibold tracking-wide mb-2">
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
                className="bg-white rounded-2xl w-4/5 sm:h-20 sm:w-3/5 h-16 tracking-wide text-3xl text-black px-2"
                type="submit"
              >
                Actualizar Usuario
              </button>
            </form>
  
            {/* Mostrar mensaje en caso de éxito */}
            {successMessage && (
              <div className="mt-6 bg-gray-900 p-4 rounded-xl shadow-lg text-white">
                <p className="text-xl font-bold mb-2">{successMessage}</p>
              </div>
            )}
  
            {/* Mostrar errores en caso de problemas */}
            {modalMessage && (
              <div className="mt-6 bg-red-900 p-4 rounded-xl shadow-lg text-white">
                <p className="text-xl font-bold mb-2">Error:</p>
                <p>{modalMessage}</p>
              </div>
            )}
          </div>
        )}
  
        {/* Modal para errores */}
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <div className="text-black text-center">{modalMessage}</div>
          </Modal>
        )}
      </div>
    );
  }
  
  export default PanelControl;
  