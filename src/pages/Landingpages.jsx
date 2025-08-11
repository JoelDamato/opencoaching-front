import React, { useRef, useState } from "react";

export default function App() {
  const aboutSectionRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const scrollToAbout = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Variables de contenido
  const photo = "https://iili.io/FQLmJp9.jpg";
  const name = "Enzo Chiapello";
  const title = "Coach Ontológico";
  const description =
    "Con experiencia acompañando a personas y organizaciones a alcanzar mayor claridad, confianza y compromiso con sus objetivos. Creo en el poder de la conversación para transformar realidades y generar resultados sostenibles, combinando escucha profunda, preguntas poderosas y herramientas prácticas para el cambio.";
  const firstSessionLink = "https://calendar.app.google/UkwVy5oRVdXEzgBLA";
    const phone = "5493512101931";
  const whatsappMessage = "Hola vi tu perfil en OpenCoaching!";
  const waNumber = String(phone).replace(/[^\d]/g, ""); // limpia todo menos dígitos
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const socials = [
    {
      name: "LinkedIn",
      icon: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
      url: "https://www.linkedin.com/in/enzochiapello/",
    },
    {
      name: "Instagram",
      icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
      url: "https://www.instagram.com/enzochiapello.ok/",
    },
    {
      name: "Facebook",
      icon: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
      url: "https://www.facebook.com/enzo.chiapello.1/",
    },
  ];
  const certifications = ["https://iili.io/FQQYMCX.jpg"];
  const about =
    "Me encanta viajar y perderme en lugares nuevos, siempre con la cámara a mano para capturar momentos y personas que me inspiran. Además de mi trabajo como coach, organizo eventos de desarrollo personal donde conecto con gente increíble y compartimos aprendizajes que nos transforman. Para mí, la vida se trata de explorar, crear y disfrutar el camino.";
  const morePhotos = [
    "https://static.wixstatic.com/media/5963df_d4a70778a36f48ce90f330103a6554ab~mv2.jpg/v1/fill/w_670,h_502,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/5963df_d4a70778a36f48ce90f330103a6554ab~mv2.jpg",
    "https://www.blogdelfotografo.com/wp-content/uploads/2020/04/fotografo-paisajes.jpg",
    "https://www.blogdelfotografo.com/wp-content/uploads/2020/04/fotografo-paisajes.jpg",
  ];

  // ✅ Testimonios como objetos con imágenes (y opcionalmente texto)
  const testimonials = [
    {
      text: "Trabajar con Enzo fue una experiencia transformadora.",
      images: ["https://iili.io/FQmC7DX.jpg"],
    },
    {
      text: "Gracias a sus sesiones, logré enfocarme en lo que realmente quiero.",
      images: ["https://iili.io/FQmx7DP.jpg"],
    },
  ];

  const openImage = (img) => setSelectedImage(img);
  const closeImage = () => setSelectedImage(null);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center py-10 px-4">
      <div className="bg-white max-w-4xl w-full shadow-lg rounded-lg p-6">
        {/* Perfil */}
        <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-6">
          <img
            src={photo}
            alt={name}
            onClick={() => openImage(photo)}
            className="w-32 h-32 md:w-40 md:h-40 aspect-square rounded-lg object-cover object-top mb-4 md:mb-0 cursor-pointer hover:scale-105 transition"
          />

          <div>
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-gray-600">{title}</p>
            <p className="mt-2 text-gray-700 text-sm">{description}</p>

            {/* Botones */}
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={firstSessionLink}
                className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition"
              >
                Quiero mi primera sesión
              </a>
              <button
                onClick={scrollToAbout}
                className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition"
              >
                Más sobre mi
              </button>
            </div>

            {/* Redes sociales */}
            {socials.some((s) => s.url && s.url.trim() !== "") && (
              <div className="mt-3 flex space-x-3">
                {socials
                  .filter((s) => s.url && s.url.trim() !== "")
                  .map((s, idx) => (
                    <a
                      key={idx}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xl"
                    >
                      <img src={s.icon} alt={s.name} className="w-6 h-6" />
                    </a>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Certificaciones */}
        <h2 className="mt-8 font-semibold border-b border-gray-300 pb-1">
          Mis certificaciones
        </h2>
        <div className="flex flex-wrap gap-4 mt-4">
          {certifications.map((cert, idx) => (
            <img
              key={idx}
              src={cert}
              alt={`Certificación ${idx + 1}`}
              className="w-48 max-w-full h-auto rounded-lg shadow-md cursor-pointer hover:scale-105 transition"
              onClick={() => openImage(cert)}
            />
          ))}
        </div>

        {/* Más sobre mi */}
        <h2
          ref={aboutSectionRef}
          className="mt-8 font-semibold border-b border-gray-300 pb-1"
        >
          Más sobre mi...
        </h2>
        <p className="mt-2 text-gray-700">{about}</p>
        <div className="flex flex-wrap gap-4 mt-4">
          {morePhotos.map((photo, idx) => (
            <img
              key={idx}
              src={photo}
              alt={`Foto ${idx + 1}`}
              className="w-32 h-24 object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 transition"
              onClick={() => openImage(photo)}
            />
          ))}
        </div>

        {/* Testimonios */}
        <h2 className="mt-8 font-semibold border-b border-gray-300 pb-1">
          Testimonios de clientes
        </h2>
        <div className="mt-4 space-y-6">
          {testimonials.length > 0 ? (
            testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                {testimonial.text && (
                  <p className="text-gray-700 italic mb-2">
                    "{testimonial.text}"
                  </p>
                )}
                <div className="flex flex-wrap gap-4">
                  {testimonial.images.map((img, imgIdx) => (
                    <img
                      key={imgIdx}
                      src={img}
                      alt={`Testimonio ${idx + 1} - Imagen ${imgIdx + 1}`}
                      className="w-32 h-24 object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 transition"
                      onClick={() => openImage(img)}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No hay testimonios aún.</p>
          )}
        </div>
      </div>

      {/* Pop-up de imagen */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            className="absolute top-6 right-6 text-white text-3xl font-bold"
            onClick={closeImage}
          >
            ✕
          </button>
          <img
            src={selectedImage}
            alt="Imagen ampliada"
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* ✅ Botón flotante de WhatsApp */}
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg bg-green-500 text-white hover:bg-green-600 active:scale-95 transition"
      >
        {/* Ícono WhatsApp (SVG inline) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-6 h-6"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M19.11 17.37a4.9 4.9 0 0 1-2.07-.47c-.64-.28-1.36-.87-1.86-1.55-.4-.53-.85-1.33-.85-2.15 0-1.04.55-1.55.75-1.76.2-.21.33-.24.45-.24h.33c.1 0 .24-.02.36.27.13.3.44 1.05.48 1.13.04.08.06.18.01.29-.05.11-.07.18-.14.28-.07.1-.15.22-.21.29-.07.07-.14.15-.06.3.08.15.37.62.8 1 .55.49 1.02.64 1.19.71.17.07.27.06.37-.04.1-.1.43-.5.55-.67.12-.17.24-.14.4-.08.16.06 1.03.49 1.2.58.17.09.28.13.32.2.04.07.04 1.03-.24 1.7-.28.67-.83 1.06-1.5 1.06ZM16.02 3C9.38 3 4 8.38 4 15.02c0 2.5.75 4.82 2.05 6.76L4 29l7.4-2.01a11.9 11.9 0 0 0 4.62.92c6.64 0 12.02-5.39 12.02-12.02C28.04 8.38 22.66 3 16.02 3Zm0 21.4c-1.62 0-3.13-.4-4.46-1.1l-.32-.17-4.39 1.19 1.17-4.27-.19-.34a9.9 9.9 0 0 1-1.53-5.19c0-5.47 4.45-9.92 9.92-9.92s9.92 4.45 9.92 9.92-4.45 9.92-9.92 9.92Z" />
        </svg>
        <span className="text-sm font-semibold hidden sm:inline">
          Escribime por WhatsApp
        </span>
      </a>
    </div>
  );
}
