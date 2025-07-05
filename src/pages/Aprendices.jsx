import Navbar from "../components/Navbar"

export default function Aprendices() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-3xl font-bold mt-12 mb-4">Próximamente</h1>
        <p className="text-gray-500 text-lg mb-8">Esta sección estará disponible pronto.</p>
        <a
          href="https://api.whatsapp.com/send/?phone=%2B5493512153675&text=Hola%2C+quiero+estar+visible+como+aprendiz+en+OpenCoaching&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <button
            className="px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all"
          >
            Quiero estar visible como aprendiz
          </button>
        </a>
      </div>
    </>
  )
}
