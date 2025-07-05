import { CheckIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

// COMPONENTES DEFINIDOS DENTRO DEL MISMO ARCHIVO

function Card({ children, className = "" }) {
  return <div className={`rounded-xl border bg-white shadow ${className}`}>{children}</div>
}

function CardHeader({ children }) {
  return <div className="border-b p-6">{children}</div>
}

function CardTitle({ children, className = "" }) {
  return <h2 className={`text-2xl font-bold ${className}`}>{children}</h2>
}

function CardDescription({ children }) {
  return <p className="text-sm text-gray-500 mt-1">{children}</p>
}

function CardContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>
}

function CardFooter({ children }) {
  return <div className="border-t p-6">{children}</div>
}

function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium text-white bg-[#00af6b] hover:bg-[#03c77d] transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default function PricingPage() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <button
        onClick={() => navigate(-1)}
        className="self-start mb-6 px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
      >
        ← Volver
      </button>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Elige el plan perfecto para ti</h1>
        <p className="mt-4 text-lg text-gray-600">
          Ofrecemos membresías diseñadas para potenciar tu desarrollo profesional.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 max-w-6xl w-full">
        {/* Plan Gratis */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>Gratis</CardTitle>
            <CardDescription>Ideal para empezar y explorar la plataforma.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="text-4xl font-bold mb-4">
              $0<span className="text-lg font-normal text-gray-500">/mes</span>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center"><CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />Acceso básico</li>
              <li className="flex items-center"><CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />Soporte comunitario</li>
              <li className="flex items-center"><CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />Funcionalidades limitadas</li>
            </ul>
          </CardContent>
          <CardFooter>
            <a
              href="https://api.whatsapp.com/send/?phone=%2B5493512153675&text=Hola%2C+quiero+empezar+con+el+plan+Gratis&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button className="w-full">Empezar Gratis</Button>
            </a>
          </CardFooter>
        </Card>

        {/* Membresía 5 USD */}
        <Card className="flex flex-col justify-between border-2 border-[#00af6b]">
          <CardHeader>
            <CardTitle>Membresía $5 USD</CardTitle>
            <CardDescription>Accede a recursos clave y mentoría mensual.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="text-4xl font-bold mb-4">
              $5<span className="text-lg font-normal text-gray-500">/mes</span>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center"><CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />Acceso a todos los cursos disponibles</li>
              <li className="flex items-center"><CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />1 reporte mensual de métricas TriadFlow</li>
              <li className="flex items-center"><CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />1 solicitud de mentoría privada con un coach</li>
              <li className="flex items-center"><CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />1 mentoría grupal semanal con Enzo</li>
              <li className="flex items-center"><CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />Participación como observador en mentorías de competencias</li>
              <li className="flex items-center"><CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />Certificado digital trimestral (opcional)</li>
              <li className="flex items-center"><CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />Comunidad interna de coaches y aprendices</li>
            </ul>
          </CardContent>
          <CardFooter>
            <a
              href="https://api.whatsapp.com/send/?phone=%2B5493512153675&text=Hola%2C+quiero+suscribirme+al+plan+de+5+d%C3%B3lares&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button className="w-full">Suscribirse</Button>
            </a>
          </CardFooter>
        </Card>

        {/* Membresía 19 USD */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>Membresía $19 USD</CardTitle>
            <CardDescription>La experiencia completa y profesional de la plataforma.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="text-4xl font-bold mb-4">
              $19<span className="text-lg font-normal text-gray-500">/mes</span>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center"><CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />Acceso completo a todos los cursos + actualizaciones</li>
              <li className="flex items-center"><CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />1 reporte mensual con evolución de métricas TriadFlow</li>
              <li className="flex items-center"><CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />4 mentorías privadas por mes con un coach</li>
              <li className="flex items-center"><CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />1 mentoría grupal semanal con Enzo</li>
              <li className="flex items-center"><CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />Participación activa en mentorías de competencias</li>
              <li className="flex items-center"><CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />Visibilidad en el panel de coaches o aprendices</li>
              <li className="flex items-center"><CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />Opción de ser Coach del Mes (plataforma + Instagram)</li>
              <li className="flex items-center"><CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />Perfil profesional en OpenCoaching</li>
              <li className="flex items-center"><CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />Acceso prioritario a eventos exclusivos</li>
            </ul>
          </CardContent>
          <CardFooter>
            <a
              href="https://api.whatsapp.com/send/?phone=%2B5493512153675&text=Hola%2C+quiero+unirme+al+plan+de+19+d%C3%B3lares&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button className="w-full">Unirse al Plan</Button>
            </a>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
