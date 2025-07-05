"use client"

import { Play, Calendar, Users, Eye, Star, ArrowRight } from "lucide-react"
import Navbar from "../components/Navbar"

const Novedades = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10"></div>
          <div className="relative max-w-7xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                <Star className="w-4 h-4 mr-2" />
                Contenido Destacado
              </div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
                Conexión Open
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Novedades, Comunidad y Visión que transforman nuestra forma de acompañar a los coaches
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 pb-20">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Video Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Episodio Destacado</h2>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          Lunes 2 de Junio 2025
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/H0m5GM8M_4M?autoplay=0&rel=0"
                      title="Conexión Open"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    En este espacio compartimos las novedades más importantes de Open Coaching: visión a futuro,
                    actividades de comunidad y avances clave que transforman nuestra forma de acompañar a los coaches.
                  </p>
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                      {/* Elimina el botón "Ver Completo" porque el video ya es reproducible aquí */}
                      <button
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: "Conexión Open - Novedades, Comunidad y Visión",
                              text: "Mira este episodio de Conexión Open sobre coaching",
                              url: "https://www.youtube.com/watch?v=H0m5GM8M_4M",
                            })
                          } else {
                            navigator.clipboard.writeText("https://www.youtube.com/watch?v=H0m5GM8M_4M")
                            alert("¡Enlace copiado al portapapeles!")
                          }
                        }}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Users className="w-4 h-4" />
                        <span>Compartir</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Community Card */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center mb-4">
                  <Users className="w-8 h-8 mr-3" />
                  <h3 className="text-lg font-semibold">Únete a la Comunidad</h3>
                </div>
                <p className="text-green-100 mb-4 text-sm">Conecta con otros coaches y accede a contenido exclusivo</p>
                <button className="w-full  text-green-600 font-semibold py-2 px-4 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center">
                <a
                  href="https://chat.whatsapp.com/Dl89h0HO8Xs0iIQT9SdW5A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-green-700 inline-flex items-center px-5 py-2 rounded-full font-medium  transition"
                >
                  Unirse Ahora
                </a>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-emerald-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-green-300 rounded-full opacity-20 blur-xl"></div>
      </div>
    </>
  )
}

export default Novedades
