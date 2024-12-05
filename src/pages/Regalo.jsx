import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';

function Regalo() {
  const navigate = useNavigate();
  return (
    <div className="py-2 w-screen overflow-y-auto bg-gradient-to-r from-blue-800 to-black flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6 text-white text-center">REGALO DE BIENVENIDA</h1>
      <p className="text-white mb-4 text-center">Estamos haciendo historia juntos, tenemos la primer plataforma de educación para barbería propia en hablahispana, por esta razón quiero regalarte una clase gratis como agradecimiento por ser parte para que puedas comenzar a educarte antes del lanzamiento!</p>

      <div className="bg-gradient-to-b from-blue-900 to-black h-auto w-full sm:w-11/12 rounded-xl sm:rounded-2xl flex flex-col items-center p-8 shadow-lg">
        
          <ReactPlayer
          url="https://youtu.be/IOUWtHAIBDM"
          width="100%"
          height="480px"
          controls
          config={{
            file: {
              attributes: {
                crossOrigin: "anonymous"  // Necesario para cargar subtítulos externos
              },
              tracks: [
                { kind: "subtitles", src: "/subtitles/english.vtt", srcLang: "en", label: "English" },
                { kind: "subtitles", src: "/subtitles/spanish.vtt", srcLang: "es", label: "Español" },
                { kind: "subtitles", src: "/subtitles/french.vtt", srcLang: "fr", label: "Français" }
              ]
            }
          }}
        />
          <p className="text-white mb-4 mt-5 text-center">
          Hoy estamos escribiendo historia juntos. Después de más de 10 años de trabajo, aprendizaje, viajes y muchas amistades cultivadas en el mundo a lo largo de estos años, finalmente hemos llegado a este momento que soñé desde el primer día: mi propia plataforma educativa. Una plataforma creada por barberos y para barberos, con el único propósito de ayudar a los barberos de todas partes del mundo a educarse con contenido de nivel elite
Este no es solo un curso más, ni una simple escuela online. Es un sistema revolucionario, diseñado con la visión de brindarles lo mejor, sin intermediarios ni limitaciones. Con Erick Gómez Academy, rompemos todas las barreras para ofrecerles la plataforma más completa y avanzada de habla hispana en educación de barbería y creamos un hibrido que incluye todo y más…
Cada detalle ha sido pensado meticulosamente:
Técnicas de barbería de nivel internacional, enseñadas paso a paso.
Clases de marketing para barberos, porque sabemos que no basta con cortar bien; también deben aprender a atraer más clientes y exponerse en las redes para crecer como verdaderos profesionales.
Diplomas certificados al completar cada formación, para que lleven con orgullo el respaldo de Erick Gómez Academy.
Para mí, Erick, y para todo el equipo, este es un momento muy especial. Verlos ingresar a nuestra academia es la confirmación de que todo el esfuerzo, las noches largas y los días intensos han valido la pena. Hoy damos un paso juntos hacia un futuro donde la educación en barbería no tiene límites.
A todos los que forman parte de este inicio histórico, gracias.
Estamos seguros de que esta plataforma será un antes y un después en sus carreras, y es un honor que me permitas ser parte de tu camino.

          </p>
          <button
  onClick={() => navigate('/Dashboard')}
  className="mt-6 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
>
  Volver
</button>

      </div>
    </div>
  );
}

export default Regalo;
