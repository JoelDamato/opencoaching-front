"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import Navbar from "../components/Navbar"

function FreeSessionLandingPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-100 flex flex-col items-center justify-center px-4 relative overflow-hidden">
        
        {/* Fondo animado suave */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-green-400 via-emerald-300 to-green-100 blur-3xl"
        />

        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10"
        >
          <h2 className="text-lg text-gray-700 mb-4">✨ Elegí tu primer paso en Open Coaching ✨</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            ¿Con quién querés conversar?
          </h1>
        </motion.div>

        {/* Opciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl relative z-10">
          
          {/* Coach Certificado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <motion.a
              href="https://www.opencoaching.io/Coaches"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-6 rounded-2xl shadow-xl font-semibold text-xl text-center transition relative w-full"
            >
              Quiero conversar con un <br /> Coach Certificado
            </motion.a>
            <div className="border-t-4 border-green-500 w-full mt-3 pt-4 text-gray-700 text-lg text-center">
              <p> Sesión 0 gratis</p>
              <p> Primera conversación de tu proceso sin costo</p>
            </div>
          </motion.div>

          {/* Aprendiz de Coaching */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <motion.a
              href="https://www.opencoaching.io/aprendices"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-6 rounded-2xl shadow-xl font-semibold text-xl text-center transition relative w-full"
            >
              Quiero conversar con un <br /> Aprendiz de Coaching
            </motion.a>
            <div className="border-t-4 border-emerald-500 w-full mt-3 pt-4 text-gray-700 text-lg text-center">
              <p> Sesión 0 gratis</p>
              <p> 100% del proceso gratis</p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Sticky WhatsApp Button */}
      <motion.a
        href="https://wa.me/5493512153675?text=Hola%2C%20tengo%20dudas"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-xl transition">
          <MessageCircle className="w-5 h-5" />
          Tengo dudas
        </button>
      </motion.a>
    </>
  )
}

export default FreeSessionLandingPage
