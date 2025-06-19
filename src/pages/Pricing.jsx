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
      {/* Botón de retroceso */}
      <button
        onClick={() => navigate(-1)}
        className="self-start mb-6 px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
      >
        ← Volver
      </button>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Elige el plan perfecto para ti</h1>
        <p className="mt-4 text-lg text-gray-600">
          Ofrecemos planes flexibles para satisfacer tus necesidades.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 max-w-6xl w-full">
        {/* Plan Gratuito */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Gratis</CardTitle>
            <CardDescription>Ideal para empezar y probar nuestras funciones básicas.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="text-4xl font-bold mb-4">
              $0<span className="text-lg font-normal text-gray-500">/mes</span>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />
                Acceso básico
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />
                Soporte comunitario
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />
                Funciones limitadas
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Empezar Gratis</Button>
          </CardFooter>
        </Card>

        {/* Plan Estándar */}
        <Card className="flex flex-col justify-between border-2 border-[#00af6b]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Estándar</CardTitle>
            <CardDescription>Perfecto para usuarios individuales que necesitan más.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="text-4xl font-bold mb-4">
              $5<span className="text-lg font-normal text-gray-500">/mes</span>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />
                Todas las funciones gratuitas
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />
                Soporte por correo electrónico
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />
                Funciones avanzadas
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />
                5 GB de almacenamiento
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Suscribirse</Button>
          </CardFooter>
        </Card>

        {/* Plan Premium */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Premium</CardTitle>
            <CardDescription>Para equipos y profesionales que buscan el máximo rendimiento.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="text-4xl font-bold mb-4">
              $20<span className="text-lg font-normal text-gray-500">/mes</span>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />
                Todas las funciones estándar
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />
                Soporte prioritario 24/7
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />
                Funciones exclusivas
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4 text-[#00af6b]" />
                Almacenamiento ilimitado
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Obtener Premium</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
