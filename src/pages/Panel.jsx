import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal'; // Importar el componente Modal
import useUserStore from '../store/users';
import { Link, useParams, useNavigate } from 'react-router-dom';


function PanelControl() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cursos, setCursos] = useState([]);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [activeSection, setActiveSection] = useState('crear');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [createdUser,setCreatedUser] = useState('');
  const [responseMessage, setResponseMessage] = useState("");
  const [responseColor, setResponseColor] = useState("");


  
  
  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
  const setUserData = useUserStore((state) => state.setUserData);
  const clearUserData = useUserStore((state) => state.clearUserData);
  const showProfile = useUserStore((state) => state.showProfile);
  const setShowProfile = useUserStore((state) => state.setShowProfile);

  const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://back-cursos.onrender.com'
    : 'http://localhost:5000';

    const generateRandomPassword = (length = 12) => {
      const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
      let password = '';
      for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return password;
    };
    
  // CREAR USUARIOS
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const generatedPassword = generateRandomPassword();
  
    try {
      const response = await axios.post(`${API_BASE_URL}/api/create/register`, {
        nombre,
        email,
        password: generatedPassword,
        cursos,
        rol: 'user',
      });
  
      if (response.status === 201) {
        setModalMessage(
          `Usuario creado exitosamente. \nEmail: ${email}\nContraseña: ${generatedPassword}`
        );
        setIsModalOpen(true); // Abrir el modal
        setNombre('');
        setEmail('');
        setCursos([]);
      }
    } catch (error) {
      setModalMessage(
        error.response?.data?.message || 'Error al registrar usuario: ' + error.message
      );
      setIsModalOpen(true); // Abrir el modal con mensaje de error
    }
  };
  //-----------------------------------------------

  // Función para manejar cambios en los checkboxes de cursos
  const handleCursoChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCursos([...cursos, value]);
    } else {
      setCursos(cursos.filter((curso) => curso !== value));
    }
  };

  // Función para editar un usuario-------------------
  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = { cursos };
      if (nombre) dataToSend.nombre = nombre;
      const response = await axios.put(`${API_BASE_URL}/api/update/users/${email}`, dataToSend);

      if (response.status === 200) {
        setModalMessage('Usuario actualizado exitosamente.');
        setNombre('');
        setCursos([]);
        setIsModalOpen(true); // Abrir el modal
      }
    } catch (error) {
      setModalMessage(
        error.response?.data?.message || 'Error al actualizar usuario: ' + error.message
      );
      setIsModalOpen(true);
    }
  };



// NUEVA CONTRASEÑA ---------------------
const handlePasswordChange = async (e) => {
  e.preventDefault();

  if (!newPassword || !confirmPassword) {
    setModalMessage('Por favor, completa todos los campos');
    setIsModalOpen(true);
    return;
  }

  if (newPassword !== confirmPassword) {
    setModalMessage('Las contraseñas no coinciden');
    setIsModalOpen(true);
    return;
  }

  if (newPassword.length < 8) {
    setModalMessage('La contraseña debe tener al menos 8 caracteres');
    setIsModalOpen(true);
    return;
  }

  try {
    const response = await axios.put(`${API_BASE_URL}/api/update/password/${email}`, {
      password: newPassword,
    });

    if (response.status === 200) {
      setModalMessage('Contraseña actualizada exitosamente.');
      setIsModalOpen(true);
      setNewPassword('');
      setConfirmPassword('');
    } else {
      throw new Error(response.data.message || 'Error al actualizar la contraseña');
    }
  } catch (error) {
    setModalMessage(error.response?.data?.message || 'Error al actualizar la contraseña.');
    setIsModalOpen(true);
  }
};
//---------------------------------------------

// BORRA USUARIO-------------------------------
const deleteUser = async () => {
  if (!email) {
    setModalMessage('Por favor, introduce un email.');
    setIsModalOpen(true);
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/update/usuarios`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    if (response.ok) {
      setModalMessage(result.message || 'Usuario eliminado correctamente.');
      setIsModalOpen(true);
    } else {
      setModalMessage(result.message || 'Error al eliminar el usuario.');
      setIsModalOpen(true);
    }
  } catch (error) {
    setModalMessage('Error de conexión al servidor.');
    setIsModalOpen(true);
  }
};
//-------------------------------------

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

  // Función para verificar si el usuario tiene un curso específico
  const hasCourse = (courseName) => {
    return user?.cursos?.includes(courseName);
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

  return (
    <div className="h-full w-screen bg-gray-100 flex flex-col items-center">
          <Navbar
        toggleProfile={toggleProfile}
        handleLogout={handleLogout}
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
      />

      {/* Navegación entre secciones */}
      <div className="bg-gray-200 w-screen rounded-xl sm:rounded-2xl flex justify-center p-4 shadow-lg mb-5">
        <button
          className={` px-4 py-2 rounded ${
            activeSection === 'crear' ? 'bg-gray-400 text-black' : 'bg-gray-200'
          }`}
          onClick={() => setActiveSection('crear')}
        >
          Registro
        </button>
        <button
          className={` px-4 py-2 rounded ${
            activeSection === 'editar' ? 'bg-gray-400 text-black' : 'bg-gray-200'
          }`}
          onClick={() => setActiveSection('editar')}
        >
          Accesos
        </button>
        <button
          className={` px-4 py-2 rounded ${
            activeSection === 'cambiarContraseña' ? 'bg-gray-400 text-black' : 'bg-gray-200'
          }`}
          onClick={() => setActiveSection('cambiarContraseña')}
        >
          Claves
        </button>
        <button
          className={` px-4 py-2 rounded ${
            activeSection === 'eliminar' ? 'bg-gray-400 text-black' : 'bg-gray-200'
          }`}
          onClick={() => setActiveSection('eliminar')}
        >
          Eliminar
        </button>
      </div>

      {/* Sección para crear usuario */}
      {activeSection === 'crear' && (
      <div className="flex  justify-center  bg-gray-100 w-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-[60%]">
          <form className="flex flex-col w-full items-center gap-5" onSubmit={handleSubmit}>
            <div className="w-4/5">
              <label className="block text-black font-semibold tracking-wide mb-2">
                Nombre:
                <input
      className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      type="email"
                  value={email}
                  placeholder="ejemplo@correo.com"
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  required
                />
              </label>
            </div>
            <div className="w-4/5">
  <label className="block text-black font-semibold tracking-wide mb-2">
    Cursos:
    <div className="flex flex-col mt-2 space-y-2">
      <label className="flex items-center justify-between">
        <span>Focus</span>
        <input
          type="checkbox"
          value="Focus"
          checked={cursos.includes('Focus')}
          onChange={handleCursoChange}
          className="relative w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-green-500 transition-colors duration-200 cursor-pointer"
        />
      </label>
      <label className="flex items-center justify-between">
        <span>Master Fade</span>
        <input
          type="checkbox"
          value="Master Fade"
          checked={cursos.includes('Master Fade')}
          onChange={handleCursoChange}
          className="relative w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-green-500 transition-colors duration-200 cursor-pointer"
        />
      </label>
      <label className="flex items-center justify-between">
        <span>Cutting Mastery</span>
        <input
          type="checkbox"
          value="Cutting Mastery"
          checked={cursos.includes('Cutting Mastery')}
          onChange={handleCursoChange}
          className="relative w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-green-500 transition-colors duration-200 cursor-pointer"
        />
      </label>
      <label className="flex items-center justify-between">
        <span>Colorimetria</span>
        <input
          type="checkbox"
          value="Colorimetria"
          checked={cursos.includes('Colorimetria')}
          onChange={handleCursoChange}
          className="relative w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-green-500 transition-colors duration-200 cursor-pointer"
        />
      </label>
      <label className="flex items-center justify-between">
        <span>GROWTH BARBER</span>
        <input
          type="checkbox"
          value="GROWTH BARBER"
          checked={cursos.includes('GROWTH BARBER')}
          onChange={handleCursoChange}
          className="relative w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-green-500 transition-colors duration-200 cursor-pointer"
        />
      </label>
      <label className="flex items-center justify-between">
        <span>REGALO DE LANZAMIENTO</span>
        <input
          type="checkbox"
          value="REGALO DE LANZAMIENTO"
          checked={cursos.includes('REGALO DE LANZAMIENTO')}
          onChange={handleCursoChange}
          className="relative w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-green-500 transition-colors duration-200 cursor-pointer"
        />
                </label>
              </div>
            </label>
          </div>


            <button
      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
      type="submit"
            >
              Registrar
            </button>
          </form>

          {successMessage && (
            <div className="mt-6 bg-gray-100 p-4 rounded-xl shadow-lg text-black">
              <p className="text-xl text-black font-bold mb-2">{successMessage}</p>
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
              
                </>
              )}
            </div>
          )}
        </div>
        </div>
      )}

      {/* Sección para editar usuario */}
      {activeSection === 'editar' && (
      <div className="flex  justify-center  bg-gray-100 w-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-[60%]">
          <form className="flex flex-col w-full items-center gap-5" onSubmit={handleEditUser}>
            <div className="w-4/5">
              <label className="text-gray-600 text-sm mb-4 text-center">
                Email del usuario a editar:
                <input
      className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      type="email"
                  value={email}
                  placeholder="ejemplo@correo.com"
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    required
                  />
                </label>
              </div>
              <div className="w-4/5">
                <label className="text-gray-600 text-sm mb-4 text-center">
                  Nombre:
                  <input
      className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </label>
              </div>
              <div className="w-4/5">
  <label className="block text-black font-semibold tracking-wide mb-2">
    Cursos:
    <div className="flex flex-col mt-2 space-y-2">
      <label className="flex items-center justify-between">
        <span>Focus</span>
        <input
          type="checkbox"
          value="Focus"
          checked={cursos.includes('Focus')}
          onChange={handleCursoChange}
          className="relative w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-green-500 transition-colors duration-200 cursor-pointer"
        />
      </label>
      <label className="flex items-center justify-between">
        <span>Master Fade</span>
        <input
          type="checkbox"
          value="Master Fade"
          checked={cursos.includes('Master Fade')}
          onChange={handleCursoChange}
          className="relative w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-green-500 transition-colors duration-200 cursor-pointer"
        />
      </label>
      <label className="flex items-center justify-between">
        <span>Cutting Mastery</span>
        <input
          type="checkbox"
          value="Cutting Mastery"
          checked={cursos.includes('Cutting Mastery')}
          onChange={handleCursoChange}
          className="relative w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-green-500 transition-colors duration-200 cursor-pointer"
        />
      </label>
      <label className="flex items-center justify-between">
        <span>Colorimetria</span>
        <input
          type="checkbox"
          value="Colorimetria"
          checked={cursos.includes('Colorimetria')}
          onChange={handleCursoChange}
          className="relative w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-green-500 transition-colors duration-200 cursor-pointer"
        />
      </label>
      <label className="flex items-center justify-between">
        <span>GROWTH BARBER</span>
        <input
          type="checkbox"
          value="GROWTH BARBER"
          checked={cursos.includes('GROWTH BARBER')}
          onChange={handleCursoChange}
          className="relative w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-green-500 transition-colors duration-200 cursor-pointer"
        />
      </label>
      <label className="flex items-center justify-between">
        <span>REGALO DE LANZAMIENTO</span>
        <input
          type="checkbox"
          value="REGALO DE LANZAMIENTO"
          checked={cursos.includes('REGALO DE LANZAMIENTO')}
          onChange={handleCursoChange}
          className="relative w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-green-500 transition-colors duration-200 cursor-pointer"
        />
      </label>
    </div>
  </label>
</div>

  
              <button
      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
      type="submit"
              >
                Actualizar Usuario
              </button>
            </form>
  
     
          </div>
          </div>
        )}



{activeSection === 'cambiarContraseña' && (
      <div className="flex  justify-center  bg-gray-100 w-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-[60%]">

    <form className="flex flex-col w-full items-center gap-5" onSubmit={handlePasswordChange}>
      <div className="w-4/5">
        <label className="text-gray-600 text-sm mb-4 text-center">Email del Usuario:</label>
        <input
      className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      type="email"
          value={email}
          placeholder="ejemplo@correo.com"
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    required
        />
      </div>
      <div className="w-4/5">
        <label className="text-gray-600 text-sm mb-4 text-center">Nueva Contraseña:</label>
        <input
      className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      <div className="w-4/5">
        <label className="text-gray-600 text-sm mb-4 text-center">Confirmar Contraseña:</label>
        <input
      className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button
      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
      type="submit"
      >
        Cambiar Contraseña
      </button>
    </form>
  </div>
  </div>
)}


{activeSection === 'eliminar' && ( 
  
  <div className="flex  justify-center  bg-gray-100 w-screen">
  <div className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-[60%]">
    <p className="text-gray-600 text-sm mb-4 text-center">
      Introduce el email del usuario que deseas eliminar:
    </p>
    <input
      type="email"
      className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="ejemplo@correo.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <button
      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
      onClick={deleteUser}
    >
      Eliminar
    </button>
    {responseMessage && (
      <div className={`mt-4 text-sm ${responseColor}`}>{responseMessage}</div>
    )}
  </div>
</div>
  )}

        {/* Modal para errores */}
        {isModalOpen && (
  <Modal onClose={() => setIsModalOpen(false)}>
    <div className="text-black text-center">
      <p className="whitespace-pre-wrap">{modalMessage}</p>
      <button
        onClick={() => setIsModalOpen(false)}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Cerrar
      </button>
    </div>
  </Modal>
)}

      </div>
    );
  }
  
  export default PanelControl;
  