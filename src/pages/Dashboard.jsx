import '../App.css';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="h-screen w-screen bg-gradient-to-r from-blue-950 to-blue-800 flex flex-col items-center">
      {/* Título del Dashboard */}
      <h1 className="text-4xl font-bold mb-6 text-white text-shadow-xl">Dashboard </h1>

      {/* Contenedor de los cursos */}
      <div className="bg-white h-auto w-full sm:w-11/12 rounded-xl sm:rounded-2xl flex flex-col items-center p-8 shadow-lg">
        <h2 className="flex justify-center text-black text-3xl tracking-wide font-bold py-4 sm:text-4xl">
          Mis Cursos
        </h2>

        {/* Tarjetas de los cursos */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
          {/* Curso 1 */}
          <div className="bg-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-4">Curso de Master Fade 2.0</h3>
            <p className="text-gray-700 mb-4">Aprende las técnicas avanzadas de barbería.</p>
            <Link to="/Masterfade" className="bg-blue-600 text-white py-2 px-4 rounded-lg">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">Ver Curso</button>
            </Link>
          </div>
          
          {/* Curso 2 */}
          <div className="bg-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-4">Curso de Focus</h3>
            <p className="text-gray-700 mb-4">Conviértete en un experto.</p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">Ver Curso</button>
          </div>

          {/* Curso 3 */}
          <div className="bg-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-4">Curso de Cutting Mastery</h3>
            <p className="text-gray-700 mb-4">Conoce las herramientas .</p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">Ver Curso</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
