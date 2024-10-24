import { Link } from 'react-router-dom';

function Masterfade() {
  return (
    <div className="h-screen w-screen bg-gradient-to-r from-blue-950 to-blue-800 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-white text-shadow-xl">Master Fade 2.0</h1>

      <div className="bg-white h-auto w-full sm:w-11/12 rounded-xl sm:rounded-2xl flex flex-col items-center p-8 shadow-lg">
        <h2 className="flex justify-center text-black text-3xl tracking-wide font-bold py-4 sm:text-4xl">
          Curso Master Fade 2.0 - Capítulos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          <div className="bg-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-4">Capítulo 1: Preparación</h3>
            <p className="text-gray-700 mb-4">Aprende cómo preparar el área de trabajo y las herramientas necesarias.</p>
            <Link to="/masterfade/1" className="bg-blue-600 text-white py-2 px-4 rounded-lg">
              Ver Capítulo
            </Link>
          </div>

          <div className="bg-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-4">Capítulo 2: Técnicas Básicas</h3>
            <p className="text-gray-700 mb-4">Dominando las técnicas básicas para lograr un fade perfecto.</p>
            <Link to="/masterfade/2" className="bg-blue-600 text-white py-2 px-4 rounded-lg">
              Ver Capítulo
            </Link>
          </div>

          <div className="bg-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-4">Capítulo 3: Técnicas Avanzadas</h3>
            <p className="text-gray-700 mb-4">Lleva tu fade al siguiente nivel con técnicas avanzadas.</p>
            <Link to="/masterfade/3" className="bg-blue-600 text-white py-2 px-4 rounded-lg">
              Ver Capítulo
            </Link>
          </div>

          <div className="bg-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-4">Capítulo 4: Finalización y Detalles</h3>
            <p className="text-gray-700 mb-4">Cómo finalizar un corte con precisión y atención a los detalles.</p>
            <Link to="/masterfade/4" className="bg-blue-600 text-white py-2 px-4 rounded-lg">
              Ver Capítulo
            </Link>
          </div>
        </div>

        <div className="mt-6">
        <Link to="/Dashboard">
          <button className="bg-black text-white py-2 px-4 rounded-lg">
            Regresar al Dashboard
          </button>
        </Link>
      </div>
      </div>
    </div>
  );
}

export default Masterfade;
