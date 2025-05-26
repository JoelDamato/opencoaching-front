import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

const IMGUR_CLIENT_ID = '10e0fdcabc2197b';

function Perfil() {
  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [imagenPerfil, setImagenPerfil] = useState('');
  const [successImgMsg, setSuccessImgMsg] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageOption, setImageOption] = useState('url');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');

  const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://opencoaching-back.onrender.com'
    : 'http://localhost:5000';

  useEffect(() => {
    if (!token || !email) return;
    axios.post(`${API_BASE_URL}/api/search/users`, { email }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUser(res.data))
      .catch(err => console.error('Error al obtener usuario:', err));
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) return setMessage('Por favor, completa todos los campos');
    if (newPassword !== confirmPassword) return setMessage('Las contraseñas no coinciden');
    if (newPassword.length < 8) return setMessage('La contraseña debe tener al menos 8 caracteres');

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/update/password/${email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });
      const data = await res.json();
      setMessage(res.ok ? 'Contraseña actualizada exitosamente' : data.message || 'Error al actualizar');
    } catch (err) {
      console.error('Error:', err);
      setMessage('Error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  const handleImagenChange = async (e) => {
    e.preventDefault();
    if (!imagenPerfil) return setSuccessImgMsg('Ingresa una URL válida');

    try {
      await axios.put(`${API_BASE_URL}/api/update/user/imagen-perfil`, {
        email, imagenPerfil
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setUser({ ...user, imagenPerfil });
      setSuccessImgMsg('Imagen actualizada correctamente');
      setShowImageModal(false);
    } catch (err) {
      console.error('Error al actualizar imagen:', err);
      setSuccessImgMsg('Error al actualizar imagen');
    }
  };

  const scrollToPassword = () => {
    setShowPasswordForm(true);
    setTimeout(() => {
      passwordRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-start min-h-screen pt-24 bg-white px-4 text-gray-900">

        {showImageModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xl relative w-full max-w-sm">
              <button className="absolute top-2 right-3 text-gray-600 text-xl" onClick={() => setShowImageModal(false)}>
                &times;
              </button>
              {user?.imagenPerfil && (
                <img src={user.imagenPerfil} alt="Ampliada" className="w-full h-auto rounded mb-4" />
              )}
              <div className="mb-2">
                <label className="block mb-1">Seleccionar método:</label>
                <select value={imageOption} onChange={(e) => setImageOption(e.target.value)} className="w-full bg-gray-100 text-gray-800 p-2 rounded">
                  <option value="url">Desde URL</option>
                </select>
              </div>
              {imageOption === 'url' && (
                <form onSubmit={handleImagenChange}>
                  <input type="text" placeholder="URL de la imagen" value={imagenPerfil} onChange={(e) => setImagenPerfil(e.target.value)} className="w-full mb-4 p-2 bg-gray-100 text-gray-800 rounded border border-gray-300" />
                  <button type="submit" className="w-full bg-black text-white py-2 rounded font-bold hover:bg-gray-800">
                    Guardar Imagen
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {user && (
          <div className="bg-white border border-gray-200 shadow-lg rounded-xl px-8 pt-6 pb-4 w-full max-w-xl mb-6">
            <h1 className="text-4xl text-center mb-6 md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-600 to-gray-900 tracking-wide">
              Perfil
            </h1>
            <div className="flex justify-center mb-4">
              <img src={user.imagenPerfil || 'https://via.placeholder.com/150'} alt="Perfil" onClick={() => setShowImageModal(true)} className="w-24 h-24 rounded-full border-2 border-gray-400 object-cover cursor-pointer" />
            </div>
            <div className="grid gap-4 mb-6 text-center">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Nombre</span>
                <span className="text-lg font-semibold">{user.nombre}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Email</span>
                <span className="text-lg font-semibold">{user.email}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Suscripción</span>
                <span className="text-lg font-semibold">{user.audiencia} Gratuita</span>
              </div>
            </div>
            <button onClick={scrollToPassword} className="w-full bg-black text-white py-2 rounded font-bold hover:bg-gray-800 mt-4">
              Cambiar Contraseña
            </button>
          </div>
        )}

        {showPasswordForm && (
          <form ref={passwordRef} onSubmit={handlePasswordChange} className="bg-white border border-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md mb-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Cambiar Contraseña</h2>
            {message && (
              <p className={`text-sm mb-4 text-center ${message.includes('exitosamente') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
            <input type="email" disabled value={email} className="w-full mb-4 bg-gray-100 text-gray-400 p-2 rounded border border-gray-300 cursor-not-allowed" />
            <input type="password" placeholder="Nueva contraseña" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full mb-4 p-2 bg-gray-100 text-gray-900 rounded border border-gray-300" />
            <input type="password" placeholder="Confirmar contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full mb-6 p-2 bg-gray-100 text-gray-900 rounded border border-gray-300" />
            <button type="submit" disabled={loading} className="w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800">
              {loading ? 'Actualizando...' : 'Guardar Cambios'}
            </button>
          </form>
        )}

        <button onClick={() => navigate('/Dashboard')} className="mt-6 bg-black text-white font-bold py-2 px-6 rounded hover:bg-gray-800">
          Volver
        </button>
      </div>
    </>
  );
}

export default Perfil;
