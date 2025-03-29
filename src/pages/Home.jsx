import '../App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
 
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [audiencia, setAudiencia] = useState('Cliente'); // Nuevo estado
  const [membresia, setMembresia] = useState(0); // Nuevo estado
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const API_BASE_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://opencoaching-back.onrender.com/'
      : 'http://localhost:5000';

  
      const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        
        if (!isLogin && password !== confirmPassword) {
          setError('Las contraseñas no coinciden.');
          return;
        }
        
        setIsLoading(true);
        
        try {
          const endpoint = isLogin ? '/api/auth/login' : '/api/create/register';
          const payload = isLogin
            ? { email: email.toLowerCase(), password }
            : { nombre, email: email.toLowerCase(), password, rol: 'user', membresia };
        
          const response = await axios.post(`${API_BASE_URL}${endpoint}`, payload);
        
          if (response.status === 201) {
            // Verificar si la URL de suscripción está presente
            console.log('Subscription URL:', response.data.subscriptionUrl); // Esto imprimirá la URL de pago en la consola
            
            if (response.data.subscriptionUrl) {
              window.location.href = response.data.subscriptionUrl; // Redirigir a Mercado Pago
            } else {
              setSuccessMessage('Cuenta creada exitosamente. ¡Ahora puedes iniciar sesión!');
              setNombre('');
              setEmail('');
              setPassword('');
              setConfirmPassword('');
              setIsLogin(true);
            }
          } else if (response.status === 200) {
            const { token } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('email', email.toLowerCase());
            navigate('/Dashboard');
          }
        } catch (err) {
          setError(err.response?.data?.message || 'Error en el proceso. Intenta nuevamente.');
        } finally {
          setIsLoading(false);
        }
      };
      
  const phoneNumber = "+59891640623"; // Reemplaza con tu número de WhatsApp en formato internacional
  const message = "Hola, tengo una consulta!."; // Mensaje predefinido opcional

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div
      className=" mb-5 w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#09886d] via-white bg-center bg-white"
    >
<img src="/logo.png" className='w-full md:w-1/2 mb-5' alt="" />
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "2px",
          right: "2px",
          backgroundColor: "black", // Color de WhatsApp
          color: "#fff",
          padding: "10px 15px",
          borderRadius: "50px",
          textDecoration: "none",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontWeight: "bold",
          fontSize: "16px",
          zIndex: 1000,
        }}
      >
        <img
          src="https://i.postimg.cc/7hnwLYTy/customer-service-support-svgrepo-com.png"
          alt="WhatsApp"
          style={{ width: "28px", height: "28px" }}
        />
        Soporte
      </a>

      {/* Formulario */}
      <div className=" bg-black/70 p-8 rounded-lg shadow-lg w-11/12 sm:w-1/2">
        <h1 className="text-white text-4xl mb-6 text-center font-bold">
          {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
  {!isLogin && (
    <>
      <div>
        <label className="block text-white mb-1">Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full h-12 px-4 rounded-lg bg-gray-200 text-black"
          placeholder="Tu nombre"
          required
        />
      </div>

      {/* Audiencia */}
      <div>
        <label className="block text-white mb-1">Soy</label>
        <select
          value={audiencia}
          onChange={(e) => setAudiencia(e.target.value)}
          className="w-full h-12 px-4 rounded-lg bg-gray-200 text-black"
          required
        >
          <option value="Cliente">Cliente</option>
          <option value="Coach Certificado">Coach Certificado</option>
          <option value="Coach Aprendiz">Coach Aprendiz</option>
        </select>
      </div>
{/* Membresía */}
{audiencia !== 'Cliente' && (
        <div>
          <label className="block text-white mb-1">Membresía</label>
          <select
            value={membresia}
            onChange={(e) => setMembresia(Number(e.target.value))}
            className="w-full h-12 px-4 rounded-lg bg-gray-200 text-black"
            required
          >
            <option value="">Selecciona tu membresía</option>
            <option value="0">Gratis</option>
            <option value="1">Básico</option>
          </select>
        </div>
      )}
    </>
  )}
  {/* Email */}
  <div>
    <label className="block text-white mb-1">Email</label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full h-12 px-4 rounded-lg bg-gray-200 text-black"
      placeholder="example@gmail.com"
      required
    />
  </div>

  {/* Contraseña */}
  <div>
    <label className="block text-white mb-1">Contraseña</label>
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full h-12 px-4 rounded-lg bg-gray-200 text-black"
      placeholder="••••••••"
      required
    />
  </div>

  {/* Confirmar Contraseña */}
  {!isLogin && (
    <div>
      <label className="block text-white mb-1">Repetir Contraseña</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full h-12 px-4 rounded-lg bg-gray-200 text-black"
        placeholder="••••••••"
        required
      />
    </div>
  )}

  {/* Botón con Loading */}
<div className="flex justify-center">
  <button
    type="submit"
    className={`${
      isLoading ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-800'
    } text-white font-bold py-3 rounded-lg flex justify-center items-center p-5`}
    disabled={isLoading}
  >
    {isLoading ? (
      <svg
        className="animate-spin h-6 w-6 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    ) : isLogin ? (
      'Iniciar Sesión'
    ) : (
      'Registrarse'
    )}
  </button>
</div>

</form>


        <p className="text-white mt-4 text-center">
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes una cuenta?'}{' '}
          <span
            className="text-blue-400 underline cursor-pointer"
            onClick={() => {
              setError('');
              setSuccessMessage('');
              setIsLogin(!isLogin);
            }}
          >
            {isLogin ? 'Crear Cuenta' : 'Iniciar Sesión'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Home;
