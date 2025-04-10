"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleStart = () => {
    navigate("/")
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-green-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <div className="flex items-center">
            <img src="logo.png" alt="OpenCoaching Logo" className="w-24 h-auto" />
          </div>

          <button
            className="flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-green-50 text-green-600 transition-colors hover:bg-green-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>

          <div className="hidden md:flex items-center space-x-8">
       
            <Link
              to="/login"
              className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-full font-medium transition-all hover:bg-green-700 hover:shadow-md"
            >
              <span>Iniciar Sesión</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute w-full bg-white border-t border-gray-100 shadow-lg animate-fadeIn">
            <nav className="container mx-auto flex flex-col space-y-4 p-6">
              <Link
                to="#contact"
                className="text-gray-700 hover:text-green-600 font-medium py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-3 rounded-full font-medium transition-all hover:bg-green-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Iniciar Sesión</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                  />
                </svg>
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-4 py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(74,222,128,0.1),transparent_70%)]"></div>
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-left space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                  Transforma tu carrera con <span className="text-green-600">OpenCoaching</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-xl">
                  Conecta con coaches profesionales, compartí tus conocimientos y ayudá a otros a crecer mientras creces
                  vos.
                </p>
               
              </div>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur-xl opacity-20 animate-pulse"></div>
                <img
                  src="https://i.ibb.co/qY9TJFWZ/1738506881332350.png"
                  alt="Plataforma OpenCoaching"
                  className="relative rounded-2xl shadow-xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium">
              Nuestra Comunidad
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Una comunidad hecha para coaches</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              En <span className="font-semibold">OpenCoaching</span> creamos un espacio donde los coaches pueden
              compartir su experiencia, conectar con colegas, potenciar su impacto y transformar más vidas. Nuestra
              plataforma no solo conecta coaches con personas, sino que te brinda las herramientas, comunidad y
              visibilidad que necesitás para crecer profesionalmente.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 bg-gradient-to-b from-green-50 to-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium">
                Características
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 text-gray-900">Todo lo que necesitás para crecer</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Agenda Inteligente",
                  description:
                    "Organiza tus sesiones de coaching con un sistema inteligente que se adapta a tu disponibilidad.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-10 h-10 text-green-600 mb-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Matching Personalizado",
                  description:
                    "Conecta con clientes que realmente se beneficiarán de tu experiencia y especialización.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-10 h-10 text-green-600 mb-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Seguimiento de Progreso",
                  description:
                    "Herramientas para monitorear el avance de tus clientes y optimizar tus sesiones de coaching.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-10 h-10 text-green-600 mb-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Comunicación Segura",
                  description: "Canales de comunicación privados y seguros para mantener contacto con tus clientes.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-10 h-10 text-green-600 mb-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                      />
                    </svg>
                  ),
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 flex flex-col items-center text-center"
                >
                  {feature.icon}
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        
        {/* CTA Section */}
        <section id="contact" className="py-20 px-4 bg-gradient-to-br from-green-50 to-white">
          <div className="container mx-auto max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">¿Listo para transformar tu vida?</h2>
                <p className="text-gray-600 mb-8">
                  Únete a miles de personas que ya están alcanzando su máximo potencial con OpenCoaching.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                   <a
                    href="/login"
                    className="bg-green-600 text-white px-8 py-3.5 rounded-full font-medium transition-all hover:bg-green-700 hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>
                 
                    Comenzar
                  
                      </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                  <a
                    href="https://calendly.com/enzochiapello/sesion-de-coaching-solidario"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-green-600 text-green-600 px-8 py-3.5 rounded-full font-medium transition-all hover:bg-green-50 hover:shadow-md flex items-center justify-center"
                  >
                    Quiero saber más
                  </a>
                </div>
              </div>
              <div className="bg-green-600 p-8 md:p-12 flex items-center justify-center">
                <div className="text-white max-w-xs">
                  <h3 className="text-2xl font-bold mb-4">Beneficios de OpenCoaching</h3>
                  <ul className="space-y-3">
                    {[
                      "Conecta con coaches certificados",
                      "Sesiones personalizadas a tu medida",
                      "Seguimiento de tu progreso",
                      "Comunidad de apoyo continuo",
                      "Recursos exclusivos para tu desarrollo",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5 flex-shrink-0"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>



      {/* Add custom styles for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
