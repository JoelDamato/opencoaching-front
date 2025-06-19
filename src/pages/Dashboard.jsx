"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Sparkles,
  Play,
  Calendar,
  MessageCircle,
  Gift,
  Users,
  CheckCircle,
  UserPlus,
  BookOpen,
  Settings,
  ArrowRight,
  Star,
  Heart,
  Zap,
} from "lucide-react"
import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"
import axios from "axios"

  const API_BASE_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://opencoaching-back-tlfh.onrender.com'
      : 'http://localhost:5000';

// Card reutilizable
const Card = ({ children, className = "", ...props }) => (
  <div className={`rounded-xl border bg-white shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-4 ${className}`} {...props}>
    {children}
  </div>
);

const AnimatedIcon = ({ icon: Icon, delay = 0 }) => (
  <motion.div
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{
      delay,
      type: "spring",
      stiffness: 260,
      damping: 20,
    }}
    className="inline-block"
  >
    <Icon className="w-5 h-5" />
  </motion.div>
)

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="group"
  >
    <Card className="bg-white/90 backdrop-blur-lg border-gray-200 hover:bg-white hover:border-green-200 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-green-700 transition-colors">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

function Dashboard() {
  const [User, SetUser] = useState("Cliente");
 console.log(User)
const navigate = useNavigate()

  useEffect(() => {
    // Verificar si hay un token almacenado
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (!token) {
     
    } else if (email) {
      // Fetch user data from API enviando el email en la solicitud POST
      axios.post(`${API_BASE_URL}/api/search/users`, { email: email }, {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token si es necesario
        }
      })
      .then(response => {
        // Guardar los datos del usuario en el estado global con Zustand
        SetUser(response.data);

        // Guardar el nombre del usuario en localStorage
        if (response.data.nombre) {
          localStorage.setItem('nombre', response.data.nombre);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    } else {
      console.error('No email found in localStorage');
    }
  }, [navigate, API_BASE_URL]);

  

  const isClient = User.audiencia == "Cliente"

  const features = isClient
    ? [
        {
          icon: Users,
          title: "Elegí tu coach",
          description: "Explorá perfiles y encontrá el coach perfecto para tu proceso de transformación.",
        },
        {
          icon: Calendar,
          title: "Reservá sesiones",
          description: "Agendá tu primera sesión individual o unite a encuentros grupales.",
        },
        {
          icon: MessageCircle,
          title: "Soporte 24/7",
          description: "Contactanos por WhatsApp o revisá nuestras Preguntas Frecuentes.",
        },
        {
          icon: Gift,
          title: "Contenido exclusivo",
          description: "Accedé a recursos premium para potenciar tu crecimiento personal.",
        },
      ]
    : [
        {
          icon: CheckCircle,
          title: "Actualizá tu perfil",
          description: "Destacá tu experiencia y conectá con más personas en tu proceso.",
        },
        {
          icon: UserPlus,
          title: "Comunidad global",
          description: "Conectá con coaches de todo el mundo y compartí recursos valiosos.",
        },
        {
          icon: BookOpen,
          title: "Prácticas en tríada",
          description: "Participá en sesiones de práctica usando nuestra herramienta TriadFlow.",
        },
        {
          icon: Settings,
          title: "Gestión completa",
          description: "Administrá tu suscripción, cursos y entrenamientos desde un solo lugar.",
        },
      ]

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 relative overflow-hidden">
        <div className="relative z-10 container mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-8 shadow-2xl"
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-green-700 to-emerald-600 bg-clip-text text-transparent mb-6">
                ¡Bienvenid@! {User.nombre}
              </h1>
              <h2 className="text-2xl text-gray-700 font-light mb-2 text-center">
                {isClient ? "Tu espacio para descubrir el coaching en acción" : "Tu espacio como Coach en OpenCoaching"}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">
                {isClient
                  ? "Nos alegra que quieras comenzar este camino de autoconocimiento y transformación. Desde este panel vas a poder agendar sesiones, recibir acompañamiento y explorar contenidos prácticos."
                  : "Desde acá vas a poder acceder a todo lo necesario para desarrollarte como coach, conectarte con colegas y aprovechar al máximo tu membresía."}
              </p>
            </div>

            <motion.div className="mb-16">
              <Card className="bg-white/80 backdrop-blur-lg border-gray-200 overflow-hidden shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center">
                    <div className="w-full max-w-3xl rounded-lg shadow-2xl" style={{ overflow: "visible" }}>
                      <iframe
                        src="https://player.vimeo.com/video/1091954558?h=35cec3fc0b"
                        width="100%"
                        height="500"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title="Video de bienvenida"
                        className="w-full rounded-lg"
                        style={{ minHeight: 350, height: 500, background: "#000" }}
                      ></iframe>
                    </div>
                  </div>
                  <p className="text-center text-gray-700 mt-6 text-lg font-medium">
                    🎥 Mirá este video donde te mostramos cómo funciona todo paso a paso
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
                <AnimatedIcon icon={isClient ? Zap : Star} />
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {isClient ? "¿Cómo aprovechar esta experiencia?" : "¿Por dónde empezar?"}
                </span>
                <AnimatedIcon icon={isClient ? Heart : Zap} />
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} delay={index * 0.1} />
              ))}
            </div>

            <div className="text-center mb-12">
              <a
                href="https://linktr.ee/opencoaching.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl"
              >
                <span>linktr.ee/opencoaching.io</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Dashboard

