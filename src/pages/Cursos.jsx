import { Link, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';

function Cursos() {
  const { cursoId } = useParams();

  useEffect(() => {
    console.log("Curso ID recibido: ", cursoId);
  }, [cursoId]);

  const courseContent = {
    '1': [
      {
        title: 'Capítulo 1: Preparación',
        description: 'Aprende cómo preparar el área de trabajo y las herramientas necesarias.',
        link: '/masterfade/1',
      },
      {
        title: 'Capítulo 2: Técnicas Básicas',
        description: 'Dominando las técnicas básicas para lograr un fade perfecto.',
        link: '/masterfade/2',
      },
      {
        title: 'Capítulo 3: Técnicas Avanzadas',
        description: 'Lleva tu fade al siguiente nivel con técnicas avanzadas.',
        link: '/masterfade/3',
      },
      {
        title: 'Capítulo 4: Finalización y Detalles',
        description: 'Cómo finalizar un corte con precisión y atención a los detalles.',
        link: '/masterfade/4',
      },
    ],
    '2': [
      {
        title: 'Capítulo 1: Introducción al Focus Cutting',
        description: 'Aprende cómo empezar con la técnica Focus Cutting y prepararte adecuadamente.',
        link: '/focus/1',
      },
      {
        title: 'Capítulo 2: Herramientas y Setup',
        description: 'Configuración adecuada de herramientas para Focus Cutting.',
        link: '/focus/2',
      },
      {
        title: 'Capítulo 3: Estrategias de Corte',
        description: 'Explora las estrategias que te ayudarán a dominar el corte Focus.',
        link: '/focus/3',
      },
      {
        title: 'Capítulo 4: Pulido Final y Detalles',
        description: 'Detalles finales para un Focus Cutting impecable.',
        link: '/focus/4',
      },
    ],
    '3': [
      {
        title: 'Capítulo 1: Introducción a Cutting Mastery',
        description: 'Aprende las bases para dominar Cutting Mastery y establecer un buen inicio.',
        link: '/cuttingmastery/1',
      },
      {
        title: 'Capítulo 2: Herramientas Especializadas',
        description: 'Descubre las herramientas necesarias y cómo configurarlas correctamente.',
        link: '/cuttingmastery/2',
      },
      {
        title: 'Capítulo 3: Técnicas Avanzadas de Corte',
        description: 'Domina técnicas avanzadas para realizar cortes de alta precisión.',
        link: '/cuttingmastery/3',
      },
      {
        title: 'Capítulo 4: Pulido y Acabado',
        description: 'Perfecciona los detalles finales para lograr un acabado impecable.',
        link: '/cuttingmastery/4',
      },
    ],
};

  const selectedCourse = courseContent[cursoId] || [];

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-blue-950 to-blue-800 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-white text-shadow-xl">
        {cursoId === '1' ? 'Master Fade 2.0' : cursoId === '2' ? 'Focus Cutting Mastery' : cursoId === '3' ? 'Cutting Mastery' : 'Curso Desconocido'}
      </h1>

      <div className="bg-white h-auto w-full sm:w-11/12 rounded-xl sm:rounded-2xl flex flex-col items-center p-8 shadow-lg">
        <h2 className="flex justify-center text-black text-3xl tracking-wide font-bold py-4 sm:text-4xl">
          {cursoId === '1' ? 'Curso Master Fade 2.0 - Capítulos' : cursoId === '2' ? 'Curso Focus Cutting - Capítulos' : cursoId === '3' ? 'Curso Cutting Mastery - Capítulos' : 'Contenido no disponible'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {selectedCourse.map((chapter, index) => (
            <div key={index} className="bg-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center">
              <h3 className="text-2xl font-bold mb-4">{chapter.title}</h3>
              <p className="text-gray-700 mb-4">{chapter.description}</p>
              <Link to={chapter.link} className="bg-blue-600 text-white py-2 px-4 rounded-lg">
                Ver Capítulo
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Link to="/Dashboard">
            <button className="bg-black text-white py-2 px-4 rounded-lg">Regresar al Dashboard</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cursos;
