"use client"

import { motion } from "framer-motion"
import {
  Calendar,
  Users,
  Sparkles,
  MessageCircle,
  Gift,
  ArrowRight,
  Zap,
  Heart,
} from "lucide-react"
import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"

const Card = ({ children, className = "", ...props }) => (
  <div className={`rounded-xl border bg-white shadow-sm ${className}`} {...props}>
    {children}
  </div>
)

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-4 ${className}`} {...props}>
    {children}
  </div>
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
            <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-green-700 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

function FreeSessionLandingPage() {
  const navigate = useNavigate()

  const features = [
    {
      icon: Users,
      title: "Elegí tu coach ideal",
      description: "Explorá perfiles de coaches certificados y conectá con quien mejor se adapte a tu proceso.",
    },
    {
      icon: Calendar,
      title: "Reservá una sesión GRATIS",
      description: "Coordiná fácilmente tu primera sesión 1:1 de forma online sin costo.",
    },
    {
      icon: MessageCircle,
      title: "Acompañamiento real",
      description: "Viví una conversación poderosa que te acerque a tu mejor versión.",
    },
    {
      icon: Gift,
      title: "Beneficios exclusivos",
      description: "Después de tu sesión gratis, accedé a descuentos y programas personalizados.",
    },
  ]

  const handleLaunchClick = () => {
    navigate("/lanzamiento")
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-100">
        <div className="container mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            
            {/* 🎥 Video explicativo */}
            <div className="flex justify-center mb-12">
              <div className="w-full max-w-3xl rounded-lg shadow-xl overflow-hidden">
                <iframe
                  width="100%"
                  height="500"
                  src="https://www.youtube.com/embed/SaCd0oEGEk4"
                  title="Video de Coaching OpenCoaching"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>

            {/* Botón a /lanzamiento */}
            <div className="text-center mb-16">
              <button
                onClick={handleLaunchClick}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-md hover:scale-105 transition"
              >
                Crea tu cuenta
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Título */}
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                ¿Qué vas a obtener?
              </h1>
              <p className="text-lg text-gray-600">
                Estos son los beneficios de tu primera sesión de coaching
              </p>
            </div>

            {/* Beneficios */}
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} delay={index * 0.1} />
              ))}
            </div>

          </motion.div>
        </div>
      </div>
      {/* Sticky WhatsApp Button */}
<a
  href="https://wa.me/5493512153675?text=Hola%2C%20tengo%20dudas"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 z-50"
>
  <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition transform hover:scale-110">
    <MessageCircle className="w-5 h-5" />
    Tengo dudas
  </button>
</a>

    </>
  )
}

export default FreeSessionLandingPage
