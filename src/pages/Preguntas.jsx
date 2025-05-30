import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navbar from '../components/Navbar';
import SupportButton from '../components/SupportButton';

const PreguntasFrecuentes = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [abiertas, setAbiertas] = useState({});

  const secciones = [
    {
      titulo: "Preguntas Frecuentes",
      preguntas: [
        {
          pregunta: "¿Qué es OpenCoaching?",
          respuesta:
            "OpenCoaching es una plataforma que conecta a personas con coaches en formación y coaches certificados. Creamos un espacio seguro y profesional para experimentar procesos de coaching reales, con prácticas, mentoría y crecimiento continuo."
        },
        {
          pregunta: "¿Quién puede agendar una sesión?",
          respuesta:
            "Cualquier persona que desee explorar un aspecto de su vida, obtener claridad, tomar decisiones o iniciar un proceso de transformación personal o profesional."
        },
        {
          pregunta: "¿Tiene costo agendar una sesión?",
          respuesta:
            "Depende del tipo de coach:\n\n🧑‍🎓 Coaches aprendices: las sesiones son 100% gratuitas.\n\n🎓 Coaches certificados: la primera conversación es sin costo. Si el cliente decide continuar, las sesiones tienen un valor a partir de 25 USD, dependiendo de los honorarios que establezca cada coach."
        },
           {
          pregunta: "¿Como cambiar mi contraseña?",
          respuesta:
            "Tenes que dirigirte a tu perfil, dentro del mismo encontraras la opcion para modificar tu contraseña."
        },
        {
          pregunta: "¿Cómo subir mi foto de perfil?",
          respuesta:
            "Tenés que ir a tu perfil y tocar tu foto actual. Se va a abrir un menú desplegable donde podés insertar la URL de tu nueva foto (es decir, la dirección web de la imagen). Antes, subí la imagen a internet usando un servicio como Imgur o Google Drive (en modo público) y copiá el enlace. Pegalo ahí… ¡y listo!"
        },
        {
          pregunta: "¿Cómo funciona TriadFlow?",
          respuesta:
            "TriadFlow organiza prácticas en tríadas, donde los coaches rotan entre los roles de coach, cliente y observador. Es una herramienta automatizada que permite practicar regularmente, recibir feedback y registrar tus horas de experiencia."
        },
        {
          pregunta: "¿Qué requisitos necesito para estar visible como coach en la plataforma?",
          respuesta:
            "Para coaches aprendices (en formación):\n- Constancia de alumno regular o certificado de cursado (emitido por tu escuela).\n- Haber participado en al menos 5 tríadas a través de TriadFlow.\n- 1 sesión con Feedback de mentor.\n- Estar formándote en una escuela con aval de ICF, AACOP u otro organismo que regule las competencias del coach.\n- Abonar la membresía mensual de $5.500 ARS (Argentina) o $5 USD (desde el exterior).\n\nPara coaches certificados:\n- Certificado de finalización o aprobado de la formación.\n- El programa debe tener aval de ICF, AACOP u organismo que regule las competencias del coach.\n- Abonar la membresía mensual de $19.500 ARS (Argentina) o $19 USD (desde el exterior)."
        },
        {
          pregunta: "¿Qué beneficios tienen los coaches?",
          respuesta:
            "- Prácticas reales con feedback.\n- Visibilidad profesional en la plataforma.\n- Acceso a mentoría, recursos y comunidad.\n- Formaciones internas exclusivas.\n- Posibilidad de sumar horas para tu credencialización.\n- Certificados y reconocimientos."
        },
        {
          pregunta: "¿Cómo me sumo como coach?",
          respuesta:
            "Completá el formulario en opencoaching.io y enviá la documentación requerida. Si cumplís con los requisitos, podrás comenzar a practicar y aparecer visible en la plataforma."
        },
        {
          pregunta: "¿Qué tipo de coaching se ofrece?",
          respuesta:
            "OpenCoaching promueve el coaching como profesión, sin distinción de escuelas. Valoramos la escucha, la pregunta y la confianza en el proceso del cliente."
        },
        {
          pregunta: "¿Qué pasa si no puedo asistir a una práctica o sesión?",
          respuesta:
            "Te pedimos que avises con al menos 24 horas de anticipación. La responsabilidad y el respeto por el tiempo del otro son parte de nuestra comunidad."
        },
        {
          pregunta: "¿Qué pasa si no estoy conforme con una sesión?",
          respuesta:
            "Podés escribirnos a soporte@opencoaching.io. Nos interesa saber tu experiencia y, si corresponde, intervenir para mejorar el proceso o reasignarte."
        },
        {
          pregunta: "¿Cómo se asignan los coaches a los clientes?",
          respuesta:
            "Los clientes eligen al coach según su perfil visible en la plataforma."
        },
        {
          pregunta: "¿Y si tengo otra duda?",
          respuesta:
            "Escribinos a soporte@opencoaching.io y con gusto te ayudamos."
        }
      ]
    }
  ];

  const togglePregunta = (id) => {
    setAbiertas((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleProfile = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const phoneNumber = "+59891640623";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("Hola, tengo una consulta!.")}`;

  return (
    <>
      <Navbar toggleProfile={toggleProfile} toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />

    <SupportButton />

      <div className="relative w-full md:h-[30vh] h-[50vh]">
        <img
          src="https://i.ibb.co/DP907JGQ/Disen-o-sin-ti-tulo-3.png"
          alt="Fondo"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <img src="https://i.ibb.co/MDb5WqLm/Disen-o-sin-ti-tulo-2.png" className="md:h-[400px] md:mt-[2%]" alt="Soporte" />
       
        </div>
      </div>

      <div className="min-h-screen bg-white text-white md:pt-10 px-6 md:px-16">
        {secciones.map((seccion, i) => (
          <div key={i} className="mb-10">
            <h2 className="p-5 text-3xl md:text-5xl font-bold text-center mb-6 text-transparent bg-gradient-to-b from-black to-gray-500 bg-clip-text drop-shadow-lg tracking-wide">
              {seccion.titulo}
            </h2>

            <div className="space-y-3">
              {seccion.preguntas.map((q, idx) => {
                const id = `${i}-${idx}`;
                const abierta = abiertas[id];

                return (
                  <div key={id} className="border border-zinc-700 rounded-xl p-4 bg-zinc-800">
                    <button
                      className="w-full flex items-center justify-between text-left font-bold text-transparent bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text drop-shadow-lg tracking-wide"
                      onClick={() => togglePregunta(id)}
                    >
                      {q.pregunta}
                      <motion.div animate={{ rotate: abierta ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown className="w-5 h-5 text-white" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {abierta && (
                       <motion.div
  initial={{ opacity: 0, height: 0 }}
  animate={{ opacity: 1, height: "auto" }}
  exit={{ opacity: 0, height: 0 }}
  transition={{ duration: 0.3 }}
  className="mt-2 text-zinc-300 text-sm leading-relaxed overflow-hidden space-y-1"
>
  {q.respuesta.split("\n").map((linea, i) => (
    <p key={i} className={linea.startsWith("-") || linea.startsWith("–") ? "pl-4 list-disc" : ""}>
      {linea}
    </p>
  ))}
</motion.div>

                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PreguntasFrecuentes;
