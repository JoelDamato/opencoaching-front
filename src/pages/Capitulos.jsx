import { useParams, useNavigate } from 'react-router-dom';

function Masterfade() {
  // Extrae el parámetro `id` de la URL y usa 'useNavigate' para redireccionar
  const { id } = useParams();
  const navigate = useNavigate();

  // Convertir 'id' a número para facilitar operaciones matemáticas
  const currentChapter = parseInt(id, 10);

  // Define contenido dinámico basado en el parámetro
  const content = {
    1: {
      title: 'Capítulo 1: Preparación',
      description: 'Aprende cómo preparar el área de trabajo y las herramientas necesarias.',
      videoSrc: 'https://drive.google.com/file/d/1SH27sfs6gSJNVvt5SavA6ZPiZ4g3f8dE/preview'
    },
    2: {
      title: 'Capítulo 2: Técnicas Básicas',
      description: 'Dominando las técnicas básicas para lograr un fade perfecto.',
      videoSrc: 'https://drive.google.com/file/d/16Ah6FklOpzvl9nyFWkfZ30NIhSBRz_xk/preview'
    },
    3: {
      title: 'Capítulo 3: Técnicas Avanzadas',
      description: 'Lleva tu fade al siguiente nivel con técnicas avanzadas.',
      videoSrc: 'https://drive.google.com/file/d/1GJKSvx2_1pv1G8ytJIn7LjlFUwyvVoee/preview'
    },
    4: {
      title: 'Capítulo 4: Finalización y Detalles',
      description: 'Cómo finalizar un corte con precisión y atención a los detalles.',
      videoSrc: 'https://drive.google.com/file/d/1ifQaC4KMIlqDfJJpa5OgoiB35uglk9Ua/preview'
    }
  };

  const totalChapters = Object.keys(content).length; // Número total de capítulos

  // Si el parámetro no coincide con ninguna entrada, muestra un mensaje de error
  const chapter = content[currentChapter] || { title: 'Capítulo no encontrado', description: '', videoSrc: '' };

  // Funciones para navegación
  const goToNextChapter = () => {
    if (currentChapter < totalChapters) {
      navigate(`/masterfade/${currentChapter + 1}`);
    }
  };

  const goToPreviousChapter = () => {
    if (currentChapter > 1) {
      navigate(`/masterfade/${currentChapter - 1}`);
    }
  };

  // Función para regresar al índice principal
  const goToMainPage = () => {
    navigate('/Dashboard/1');
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-blue-950 to-blue-800 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6 text-white text-shadow-xl">{chapter.title}</h1>

      <div className="bg-white h-auto w-full sm:w-11/12 rounded-xl sm:rounded-2xl flex flex-col items-center p-8 shadow-lg">
        <p className="text-gray-700 mb-4">{chapter.description}</p>
        
        {chapter.videoSrc && (
          <iframe
            className="rounded-lg mb-4"
            width="100%"
            height="480"
            src={chapter.videoSrc}
            allow="autoplay"
          ></iframe>
        )}

        {/* Botones de navegación */}
        <div className="flex justify-between w-full mt-6">
          {currentChapter === 1 && (
            <button 
              onClick={goToMainPage}
              className="bg-black text-white py-2 px-4 rounded-lg"
            >
              Regresar
            </button>
          )}

          {currentChapter > 1 && (
            <button 
              onClick={goToPreviousChapter}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Anterior
            </button>
          )}

          {currentChapter < totalChapters && (
            <button 
              onClick={goToNextChapter}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Siguiente
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Masterfade;
