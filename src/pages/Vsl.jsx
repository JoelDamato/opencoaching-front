import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";

export default function WorkshopLanding() {

  
  const [timeLeft, setTimeLeft] = useState(3600000); // 1 hora en milisegundos
  const [showExtraContent, setShowExtraContent] = useState(false);
  const videoRef = useRef(null)




const benefits = [
    { 
        text: "Cursos de herramientas digitales para facilitar tu trabajo como coach.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5V4.5A1.5 1.5 0 0 1 5.5 3h13A1.5 1.5 0 0 1 20 4.5v15m-16 0h16m-16 0a1.5 1.5 0 0 0 1.5 1.5h13a1.5 1.5 0 0 0 1.5-1.5m-12-3h8m-8-3h5m-5-3h3" />
            </svg>
        )
    },
    { 
        text: "Visibilidad en nuestra plataforma ante potenciales clientes.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.97 0-9 7.03-9 9s4.03 9 9 9 9-7.03 9-9-4.03-9-9-9zm0 4.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5z" />
            </svg>
        )
    },
    { 
        text: "Sesión cero gratuita para facilitar la conversión de clientes.",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
        </svg>
        
        )
    },
    { 
        text: "Acceso a la comunidad online, eventos semanales y mentorías para mejorar la competencia.",
        icon: (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
</svg>

        )
    },
    { 
        text: "Espacio de networking exclusivo para crecimiento.",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
        </svg>
        
        )
    },
    { 
        text: "Acceso inmediato a la comunidad, recursos y mentorías grupales.",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
</svg>

        )
    },
    { 
        text: "Prácticas guiadas para perfeccionar tus habilidades en un entorno seguro.",
        icon: (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
</svg>

        )
    }
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
<div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-white via-[#09886d] to-white font-sans ">

<img src="/logo.png" alt="" className='w-full mt-4 mb-4 md:w-1/2 ' />
      {/* Header */}

   
      <div className="bg-white rounded-2xl max-w-4xl w-[96%] p-2 md:p-6 md:w-full mx-5 shadow-lg mt-2 md:mt-7">
        <header className="text-center">
         

          <h1 className="text-black text-3xl md:text-5xl font-bold drop-shadow-lg mt-2 mb-2">
          Tu camino comienza con una decisión: ¿Estás listo?</h1>

          <p className="text-1xl text-[#09886d] mb-3">
          <span className="text-[#09886d] font-bold">
          Transforma el mundo de las personas en open coaching
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
        <section className="w-full max-w-4xl  px-4 mt-2 bg-white ">
        
          <div className='flex flex-col items-center' >
          <h2 className="mt-10 text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-[#09886d] overflow-hidden border-b-4 border-[#09886d]  whitespace-nowrap animate-typing max-w-full mx-auto">
  Esta membresia es para ti si ...
</h2>

<img src="/libro.png" alt="" />

<div className="p-6 rounded-lg shadow-2xl max-w-4xl mx-auto mb-5 text-black">
  <ul className="space-y-4 text-1xl md:text-2xl">
  <li className="flex items-start gap-4">
      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#09886d]  flex-shrink-0" viewBox="0 0 24 24">
        <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
      <span className="leading-relaxed">Te apasiona acompañar a personsas a lograr un cambio en su vida</span>
    </li>
    <li className="flex items-start gap-4">
      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#09886d]  flex-shrink-0" viewBox="0 0 24 24">
        <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
      <span className="leading-relaxed">Buscas una comunidad que te acompañe a tu crecimiento profesional y personal</span>
    </li>
    <li className="flex items-start gap-4">
      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#09886d]  flex-shrink-0" viewBox="0 0 24 24">
        <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
      <span className="leading-relaxed">Buscas herramientas digitales que te faciliten tu trabajo como coach</span>
    </li>
    <li className="flex items-start gap-4">
      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#09886d]  flex-shrink-0" viewBox="0 0 24 24">
        <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
      <span className="leading-relaxed">Necesitas rodearte con personas que te impulsan hacia tus metas.</span>
    </li>
    <li className="flex items-start gap-4">
      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#09886d]  flex-shrink-0" viewBox="0 0 24 24">
        <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
      <span className="leading-relaxed">Queres seguir mejorando tus habilidades como coach en un entorno de aprendizaje constante.</span>
    </li>

    <li className="flex items-start gap-4">
      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#09886d]  flex-shrink-0" viewBox="0 0 24 24">
        <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
      <span className="leading-relaxed">Si sos de mente positiva y buscas un cambio en tu vida.</span>
    </li>
  </ul>
</div>

         
          </div>
        </section>
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-[#09886d] border-b-4 border-[#09886d] max-w-full mx-auto">
                Beneficios de pertenecer a OpenCoaching
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
                <motion.li 
                    key={index}
                    className="flex items-center gap-3  border-y-2 border-green-500/50 rounded-lg p-3 gap-2 h-36"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                >
                    {benefit.icon}
                    <span>{benefit.text}</span>
                </motion.li>
            ))}
            </div>
        </div>
          </div>
   
          <div className="relative flex flex-col items-center mt-3 mb-4 space-y-2">
  {/* Imagen */}
  <div className="flex flex-col items-center">
    <img src="/mockup.png" className="w-full max-w-md" />
    {/* Contenedor del texto, que se mete sobre la imagen en mobile */}
    <div className="flex flex-col items-center transform -translate-y-10 md:translate-y-0 text-center">
      {/* Precio regular tachado */}
      <h3 className="text-base font-semibold text-gray-600 bg-white bg-opacity-80 px-2 py-1 rounded-md inline-block">
        PRECIO REGULAR: <span className="line-through text-gray-400">$40.000 por mes</span>
      </h3>

      {/* Precio actual destacado */}
      <h3 className="text-3xl text-black font-bold mt-1 bg-white bg-opacity-90 px-3 py-1 rounded-md inline-block">
        AHORA: <span className="text-[#09886d]">$19.500</span> por mes
      </h3>

      <p className='font-bold text-lg mb-5'>7 dias de prueba totalmente <span className="text-[#09886d]">GRATIS</span>!</p>
      <h2> No te pedimos tarjeta de credito, queremos que vivas la experiencia Open Coaching.</h2>
      

    </div>
  </div>

  {/* Botón CTA mejorado */}
  <button
  onClick={() => window.open("https://wa.me/+5493512153675?text=¡Hola!%20Quiero%20mi%20prueba%20gratuita%20de%207%20días.", "_blank")}
  className="bg-gradient-to-r from-black via-[#09886d] to-black text-white text-xl md:text-2xl font-semibold py-4 px-10 rounded-lg w-full max-w-2xl mx-auto mt-3 mb-8 transition-transform transform hover:scale-105 shadow-lg"
  style={{
    backgroundSize: "200%",
    backgroundPosition: "center",
  }}
>
  ¡Sí! Quiero mi prueba gratuita de 7 días
</button>
</div>






        
      
         
       



       
      </div>
    </div>
  );
}

