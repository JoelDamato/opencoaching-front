import '../App.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://back-cursos.onrender.com'
    : 'http://localhost:5000';

  // Agregar lógica para redirigir si el token ya existe
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/Dashboard');  // Redirige automáticamente si ya hay un token almacenado
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data); // Verificar la respuesta del servidor

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', email);
        navigate('/Dashboard');  // Redirige al Dashboard en caso de éxito
      } else {
        setError(data.message || 'Login fallido. Por favor, verifica tus credenciales.');
      }
    } catch (error) {
      console.error('Error durante el login:', error);
      setError('Error en el servidor. Por favor, intenta nuevamente más tarde.');
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-blue-950 to-blue-800 flex flex-col items-center justify-center"> 
      <h1 className="text-4xl font-bold mb-6 text-white text-shadow-xl">Erick Gomez Academy</h1>
      
      <div className="bg-white h-auto w-full sm:w-11/12 rounded-xl sm:rounded-2xl flex flex-col items-center p-8 shadow-lg">
        <h1 className="flex justify-center text-black text-3xl tracking-wide font-bold py-4 sm:text-6xl">
          INGRESAR
        </h1>

        {error && <p className="text-red-500">{error}</p>}

        <form className="flex flex-col w-full items-center gap-5" onSubmit={handleSubmit}>
          <div className="w-4/5">
            <label className="block text-black font-semibold tracking-wide mb-2">
              EMAIL:
              <div className="flex items-center mt-1">
                <input
                  className="w-full h-12 sm:h-16 bg-gray-200 rounded-lg px-4"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <img
                  className="w-6 h-6 sm:w-10 sm:h-10 sm:mt-5 ml-[-10%] mt-2 mr-1"
                  src="https://cdn-icons-png.flaticon.com/128/3916/3916631.png"
                  alt="Email Icon"
                />
              </div>
            </label>
          </div>

          <div className="w-4/5">
            <label className="block text-black font-semibold tracking-wide mb-2">
              CONTRASEÑA:
              <div className="flex items-center mt-1">
                <input
                  className="w-full h-12 sm:h-16 bg-gray-200 rounded-lg px-4"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <img
                  className="w-6 h-6 sm:w-10 sm:h-10 sm:mt-5 ml-[-10%] mt-2 mr-1"
                  src="https://cdn-icons-png.flaticon.com/128/3917/3917642.png"
                  alt="Password Icon"
                />
              </div>
            </label>
          </div>

          <button
            className="bg-black rounded-2xl w-4/5 sm:h-20 sm:w-3/5 h-16 tracking-wide text-3xl text-white"
            type="submit"
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
