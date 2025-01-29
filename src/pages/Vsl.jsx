import React, { useState, useEffect, useRef } from 'react';

export default function WorkshopLanding() {

  
  const [timeLeft, setTimeLeft] = useState(3600000); // 1 hora en milisegundos
  const [showExtraContent, setShowExtraContent] = useState(false);
  const videoRef = useRef(null)

  const benefits = [
    "Conexión con clientes potenciales sin necesidad de buscarlos manualmente.",
    "Sesión cero gratuita para facilitar la conversión de clientes.",
    "Libertad para establecer tu propio honorario por sesión.",
    "Acceso a herramientas exclusivas para mejorar tu oferta y competitividad.",
    "Garantía de reembolso durante los primeros 7 días.",
    "Acceso inmediato a la comunidad, recursos y mentorías grupales.",
    "Cursos prácticos para potenciar tu marca personal y habilidades digitales.",
    "Espacio de networking exclusivo para crecimiento en comunidad.",
    "Prácticas guiadas para perfeccionar tus habilidades en un entorno seguro."
];


  useEffect(() => {
    // Escuchar mensajes del iframe
    const handleMessage = (event) => {
      const { data } = event;

      // Verificar si el mensaje es del evento panda_timeupdate
      if (data.message === "panda_timeupdate") {
        console.log(`Tiempo actual del video: ${data.currentTime}s`);

        // Mostrar contenido adicional si el tiempo alcanza 180 segundos
        if (data.currentTime >= 1) {
          setShowExtraContent(true);
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          return 3600000; // Reinicia el cronómetro a 1 hora
        }
        return prevTime - 1000;
      });
    }, 1000);

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);

  const formatTime = (time) => {
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
<div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-black via-blue-900 to-black font-sans">


      {/* Header */}
      <h1 className="text-white text-5xl md:text-9xl font-bold drop-shadow-lg mb-1 mt-4">Open Coaching</h1>
        <h2  className="text-center text-white text-2xl md:text-4xl font-bold drop-shadow-lg mt-2 mb-2" >La plataforma que escucha tu mundo</h2>
   
      <div className="bg-white rounded-2xl max-w-4xl w-[96%] p-2 md:p-6 md:w-full mx-5 shadow-lg mt-2 md:mt-7">
        <header className="text-center">
         

          <h1 className="text-blue-950 text-3xl md:text-5xl font-bold drop-shadow-lg mt-2 mb-2">
          Tu camino comienza con una decisión: ¿Estás listo?</h1>

          <p className="text-1xl text-gray-700 mb-3">
          <span className="text-black font-bold">
          Convierte tu visión en resultados concretos{" "}
            </span>
          </p>
        </header>

        <div className="text-center flex justify-center items-center w-full mb-5 bg-black">
  <div className="relative w-full max-w-4xl aspect-video mt-5">
    <iframe
      src="https://player.vimeo.com/video/1051695808?h=4211e0dbc5"
      className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
      frameBorder="0"
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
</div>






      <div>
        <section className="w-full max-w-4xl  px-4 mt-2 bg-white">
        
          <div >
          <h2 className="mt-10 text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-blue-900  overflow-hidden border-b-4 border-blue-900  whitespace-nowrap animate-typing max-w-full mx-auto">
  Esta membresia es para ti si ...
</h2>



<div className="p-6 rounded-lg shadow-2xl max-w-4xl mx-auto mb-5 text-black">
  <ul className="space-y-4 text-1xl md:text-2xl">
    <li className="flex items-start gap-4">
      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-blue-900  flex-shrink-0" viewBox="0 0 24 24">
        <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
      <span className="leading-relaxed">Ya tienes conocimientos y experiencia, pero te falta una estrategia clara para atraer clientes y vender sin sentir que “estás rogando”.</span>
    </li>
    <li className="flex items-start gap-4">
      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-blue-900  flex-shrink-0" viewBox="0 0 24 24">
        <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
      <span className="leading-relaxed">Te interesa formar parte de una comunidad que te apoye y te impulse al éxito.</span>
    </li>
    <li className="flex items-start gap-4">
      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-blue-900  flex-shrink-0" viewBox="0 0 24 24">
        <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
      <span className="leading-relaxed">Has intentado diferentes estrategias, cursos y herramientas, pero sigues sintiendo que falta algo. Quieres un sistema claro y comprobado para avanzar de manera efectiva.</span>
    </li>
    <li className="flex items-start gap-4">
      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-blue-900  flex-shrink-0" viewBox="0 0 24 24">
        <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
      <span className="leading-relaxed">Si sos de mente positiva y buscas un cambio en tu vida.</span>
    </li>
  </ul>
</div>

         
          </div>
        </section>
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-blue-900 border-b-4 border-blue-900 max-w-full mx-auto">
                Beneficios de pertenecer a OpenCoaching
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                    <div key={index} className="p-6 bg-blue-200 rounded-lg shadow-lg text-2xl">
                        <p className="text-gray-700">{benefit}</p>
                    </div>
                ))}
            </div>
        </div>
          </div>
  
          <div className="flex flex-col items-center mt-4 mb-5 space-y-3">
  {/* Precio regular tachado */}
  <img src="/mockup.png" className='' />
  <h3 className="text-base font-semibold text-gray-600">
    PRECIO REGULAR: <span className="line-through text-gray-400">$40.000 por mes</span>
  </h3>

  {/* Precio actual destacado */}
  <h3 className="text-3xl  text-black">
    AHORA: <span className="text-black font-bold">$19.500</span> por mes
  </h3>

  {/* Botón CTA mejorado */}
  <button
    onClick={() => window.open("https://pay.hotmart.com/O94296249S?checkoutMode=10&bid=1725551295569", "_blank")}
    className=" bg-gradient-to-r from-black via-blue-900 to-black text-white text-xl md:text-2xl font-semibold py-4 px-10 rounded-lg w-full max-w-2xl mx-auto mt-4 mb-10 transition-transform transform hover:scale-105 shadow-lg"
    style={{
      backgroundSize: "200%",
      backgroundPosition: "center",
    }}
  >
    ¡Sí! Quiero Acceso Inmediato
  </button>
</div>




        
      
         
       



       
      </div>
    </div>
  );
}

