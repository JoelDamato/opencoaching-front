export default function CtaSection() {
  // Iconos SVG simples reemplazando los de Lucide
  const Check = () => (
    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )

  const Users = () => (
    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M17 20h5v-2a4 4 0 00-5-4M9 20H4v-2a4 4 0 015-4m0-6a4 4 0 110-8 4 4 0 010 8zm10 0a4 4 0 100-8 4 4 0 000 8z" />
    </svg>
  )

  const Target = () => (
    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )

  const BookOpen = () => (
    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M12 4a4 4 0 014 4v12a4 4 0 00-4-4 4 4 0 00-4 4V8a4 4 0 014-4z" />
    </svg>
  )

  const MessageSquare = () => (
    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  )

  const Button = ({ children, className = "", ...props }) => (
    <button
      {...props}
      className={`px-6 py-3.5 rounded-full bg-green-600 text-white font-medium transition-all hover:bg-green-700 hover:shadow-lg ${className}`}
    >
      {children}
    </button>
  )

  const benefitsCoach = [
    "Conecta con clientes potenciales",
    "Sesiones personalizadas a tu medida",
    "Seguimiento de tu progreso",
    "Comunidad de apoyo continuo",
    "Recursos exclusivos para tu desarrollo",
  ]

  const benefitsClient = [
    { icon: Users, text: "Acceso a coaches certificados" },
    { icon: Target, text: "Planes de coaching personalizados" },
    { icon: BookOpen, text: "Recursos y herramientas de aprendizaje" },
    { icon: MessageSquare, text: "Comunicación directa y segura" },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-white">
      <div className="mx-auto max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 text-center">
          ¿Listo para transformar tu vida?
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Soy Coach */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold mb-3 text-gray-800">Soy Coach</h3>
            <p className="text-gray-600 mb-6">
              Si eres un coach certificado, únete a nuestra plataforma para expandir tu alcance, conectar con nuevos
              clientes y gestionar tus sesiones de manera eficiente.
            </p>
            <div className="text-left w-full mb-6">
              <h4 className="text-xl font-semibold mb-3 text-gray-700">Beneficios para Coaches:</h4>
              <ul className="space-y-2 text-gray-600">
                {benefitsCoach.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a href="https://membresia.opencoaching.io/miembros" className="w-full mt-auto">
              <Button className="w-full">Empezar como Coach</Button>
            </a>
          </div>

          {/* Soy Cliente */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold mb-3 text-gray-800">Soy Cliente</h3>
            <p className="text-gray-600 mb-6">
              Si buscas transformar tu vida, encuentra al coach perfecto para ti. Accede a sesiones personalizadas,
              seguimiento de progreso y una comunidad de apoyo.
            </p>
            <div className="text-left w-full mb-6">
              <h4 className="text-xl font-semibold mb-3 text-gray-700">Beneficios para Clientes:</h4>
              <ul className="space-y-2 text-gray-600">
                {benefitsClient.map(({ icon: Icon, text }, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Icon />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a href="/login" className="w-full mt-auto">
              <Button className="w-full">Comenzar como Cliente</Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
