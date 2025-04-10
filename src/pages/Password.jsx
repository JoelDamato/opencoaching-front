import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Password() {
  const email = localStorage.getItem('email'); // Obtener email desde el localStorage
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://back-cursos.onrender.com'
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: newPassword,
        }),
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
    if (!inputValue) return 'border-gray-500';
    if (newPassword === confirmPassword && newPassword.length >= 8) {
      return 'border-green-500';
    }
    return 'border-red-500';
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-black">
      <form
        onSubmit={handlePasswordChange}
        className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Perfil</h2>

        {message && (
          <p
            className={`text-sm mb-4 text-center ${
              message.includes('exitosamente') ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {message}
          </p>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            disabled
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-gray-400 cursor-not-allowed"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-gray-300 text-sm font-bold mb-2">
            Nueva Contraseña
          </label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`shadow appearance-none rounded w-full py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${getInputBorderStyle(newPassword)}`}
            placeholder="Ingresa la nueva contraseña"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-bold mb-2">
            Confirmar Contraseña
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`shadow appearance-none rounded w-full py-2 px-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${getInputBorderStyle(confirmPassword)}`}
            placeholder="Confirma la nueva contraseña"
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Actualizando...' : 'Guardar Cambios'}
        </button>
      </form>
      <button
  onClick={() => navigate('/Dashboard')}
  className="mt-6 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
>
  Volver
</button>

    </div>
  );
}

export default Password;
