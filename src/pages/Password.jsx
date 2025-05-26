import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Password() {
  const email = localStorage.getItem('email');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://opencoaching-back.onrender.com'
    : 'http://localhost:5000';

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setMessage('Por favor, completa todos los campos');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      return;
    }

    if (newPassword.length < 8) {
      setMessage('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/update/password/${email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Contraseña actualizada exitosamente');
      } else {
        setMessage(data.message || 'Error al actualizar la contraseña');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Hubo un error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  const getInputBorderStyle = (inputValue) => {
    if (!inputValue) return 'border-gray-300';
    if (newPassword === confirmPassword && newPassword.length >= 8) {
      return 'border-green-500';
    }
    return 'border-red-500';
  };

  return (
    <>
          <Navbar/>
    
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-2xl font-semibold text-center mb-6">Cambiar Contraseña</h2>

        {message && (
          <p
            className={`text-sm text-center mb-4 ${
              message.includes('exitosamente') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-5">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-600 block mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              disabled
              className="w-full bg-gray-100 border border-gray-300 text-gray-500 rounded-lg px-4 py-2 cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="text-sm font-medium text-gray-600 block mb-1">
              Nueva Contraseña
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${getInputBorderStyle(newPassword)}`}
              placeholder="Ingresa la nueva contraseña"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-600 block mb-1">
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${getInputBorderStyle(confirmPassword)}`}
              placeholder="Confirma la nueva contraseña"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Actualizando...' : 'Guardar Cambios'}
          </button>
        </form>

        <button
          onClick={() => navigate('/perfil')}
          className="w-full mt-4 text-sm text-blue-600 hover:underline"
        >
          Volver a mi Perfil
        </button>
      </div>
    </div>
    </>
  );
}

export default Password;
