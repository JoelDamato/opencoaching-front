import React, { useEffect, useMemo, useRef, useState } from "react";

export default function App() {
  const aboutSectionRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Estado de datos remotos
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const API_BASE =
    import.meta.env?.VITE_API_BASE ||
    (process.env.NODE_ENV === "production"
      ? "https://opencoaching-back-tlfh.onrender.com"
      : "http://localhost:5001");

  const isObjectId = (s) => /^[a-fA-F0-9]{24}$/.test(String(s || ""));

  // Obtiene el id del último segmento del path (ej: /landing/<id>)
  const getIdFromPath = () => {
    const parts = window.location.pathname.split("/").filter(Boolean);
    return parts.length ? parts[parts.length - 1] : "";
  };

  useEffect(() => {
    const id = getIdFromPath();

    if (!isObjectId(id)) {
      setLoading(false);
      setNotFound(true);
      return;
    }

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/profiles/${id}`);
        const data = await res.json();
        if (!res.ok || !data || !data.name) {
          setNotFound(true);
        } else {
          setProfile(data);
        }
      } catch (e) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Mapear socials (array de URLs) a objetos con icono+nombre
  const socials = useMemo(() => buildSocials(profile?.socials || []), [profile]);

  // Variables derivadas (con fallbacks)
  const photo = profile?.photo || "";
  const name = profile?.name || "";
  const title = profile?.title || "";
  const description = profile?.description || "";
  const firstSessionLink = profile?.firstSessionLink || "#";
  const phone = profile?.phone || "";
  const whatsappMessage = profile?.whatsappMessage || "Hola!";
  const waNumber = String(phone).replace(/[^\d]/g, "");
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  const certifications = profile?.certifications || [];
  const about = profile?.about || "";
  const morePhotos = profile?.morePhotos || [];
  const testimonials = profile?.testimonials || [];

  const openImage = (img) => setSelectedImage(img);
  const closeImage = () => setSelectedImage(null);
  const scrollToAbout = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <p className="text-gray-600">Cargando perfil…</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen grid place-items-center p-6 text-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Perfil no encontrado</h1>
          <p className="text-gray-600">
            La URL debe ser <code>/landing/&lt;ObjectId de 24 caracteres&gt;</code>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center py-10 px-4">
      <div className="bg-white max-w-4xl w-full shadow-lg rounded-lg p-6">
        {/* Perfil */}
        <div className="flex flex-col items-center md:flex-row md:items-center md:space-x-6">
          {photo && (
            <img
              src={photo}
              alt={name}
              onClick={() => openImage(photo)}
              className="w-32 h-32 md:w-40 md:h-40 aspect-square rounded-lg object-cover object-top mb-4 md:mb-0 cursor-pointer hover:scale-105 transition"
            />
          )}

          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold">{name}</h1>

            {/* Title + tilde verificado a la derecha */}
            <div className="flex justify-center md:justify-start items-center gap-1 text-gray-600">
              <span>{title}</span>
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4"
                aria-label="Verificado"
                role="img"
              >
                <circle cx="12" cy="12" r="10" className="fill-[#1877F2]" />
                <path
                  d="M8 12l2.5 2.5L16 9"
                  className="stroke-white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
            <p className="mt-2 text-gray-700 text-sm">{description}</p>

            {/* Botones */}
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
              {firstSessionLink && (
                <>
                  <a
                    href={firstSessionLink}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition"
                  >
                    Agendá tu primera sesion gratis ahora
                  </a>
                  <p className="w-full text-center md:text-left text-sm text-gray-500">
                    Primera sesión sin costo - Reserva en menos de 1 minuto
                  </p>
                </>
              )}
            </div>

            {/* Redes sociales */}
            {socials.length > 0 && (
              <div className="mt-3 flex justify-center md:justify-start space-x-3">
                {socials.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xl"
                    aria-label={s.name}
                    title={s.name}
                  >
                    <img src={s.icon} alt={s.name} className="w-6 h-6" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
   {/* Testimonios */}
        <h2 className="mt-8 font-semibold border-b border-gray-300 pb-1 text-center md:text-left">
          Testimonios de clientes
        </h2>
        <div className="mt-4 space-y-6">
          {Array.isArray(testimonials) && testimonials.length > 0 ? (
            testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                {/* Imágenes ARRIBA, completas y full width en mobile */}
                {Array.isArray(testimonial.images) && testimonial.images.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {testimonial.images.map((img, imgIdx) => (
                      <button
                        key={imgIdx}
                        type="button"
                        onClick={() => openImage(img)}
                        className="block w-full rounded-lg overflow-hidden bg-gray-100 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        aria-label={`Abrir imagen del testimonio ${idx + 1}-${imgIdx + 1}`}
                      >
                        <img
                          src={img}
                          alt={`Testimonio ${idx + 1} - Imagen ${imgIdx + 1}`}
                          className="w-full h-auto object-contain transition duration-200 hover:opacity-90"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Texto DEBAJO */}
                {testimonial.text && (
                  <p className="mt-3 text-gray-700 italic">"{testimonial.text}"</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No hay testimonios aún.</p>
          )}
        </div>
        {/* Certificaciones */}
        {certifications.length > 0 && (
          <>
            <h2 className="mt-8 font-semibold border-b border-gray-300 pb-1 text-center md:text-left">
              Mis certificaciones
            </h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
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
          </>
        )}

        {/* Más sobre mi */}
        <h2
          ref={aboutSectionRef}
          className="mt-8 font-semibold border-b border-gray-300 pb-1 text-center md:text-left"
        >
          Más sobre mi...
        </h2>
        <p className="mt-2 text-gray-700 text-center md:text-left">{about}</p>
        {morePhotos.length > 0 && (
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
            {morePhotos.map((p, idx) => (
              <img
                key={idx}
                src={p}
                alt={`Foto ${idx + 1}`}
                className="w-32 h-24 object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 transition"
                onClick={() => openImage(p)}
              />
            ))}
          </div>
        )}

     
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

      {/* Botón flotante de WhatsApp */}
      {waNumber && (
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          aria-label="Contactar por WhatsApp"
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg bg-green-500 text-white hover:bg-green-600 active:scale-95 transition"
        >
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
      )}
    </div>
  );
}

// Helpers
function buildSocials(urls) {
  const ICONS = {
    "linkedin.com": "https://cdn-icons-png.flaticon.com/512/174/174857.png",
    "instagram.com": "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
    "facebook.com": "https://cdn-icons-png.flaticon.com/512/733/733547.png",
    "twitter.com": "https://cdn-icons-png.flaticon.com/512/733/733579.png",
    "x.com": "https://cdn-icons-png.flaticon.com/512/5969/5969020.png",
    "youtube.com": "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
  };
  const GENERIC = "https://cdn-icons-png.flaticon.com/512/929/929564.png";

  return (urls || [])
    .filter(Boolean)
    .map((u) => {
      let host = "";
      try {
        host = new URL(u).hostname.replace(/^www\./, "").toLowerCase();
      } catch (_) {}
      const matchKey = Object.keys(ICONS).find((k) => host.endsWith(k));
      const icon = matchKey ? ICONS[matchKey] : GENERIC;
      const rawName = matchKey ? matchKey.split(".")[0] : "Link";
      const name =
        rawName === "youtube"
          ? "YouTube"
          : rawName === "x"
          ? "X"
          : rawName.charAt(0).toUpperCase() + rawName.slice(1);
      return { name, icon, url: u };
    });
}

