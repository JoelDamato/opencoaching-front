import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"

// Componente: Card
function Card({ children, className = "" }) {
  return <div className={`rounded-xl border bg-white shadow ${className}`}>{children}</div>
}

// Componente: CardHeader
function CardHeader({ children }) {
  return <div className="border-b p-6">{children}</div>
}

// Componente: CardTitle
function CardTitle({ children, className = "" }) {
  return <h2 className={`text-2xl font-bold ${className}`}>{children}</h2>
}

// Componente: CardContent
function CardContent({ children }) {
  return <div className="p-6">{children}</div>
}

// Componente: Input
function Input({ id, type = "text", value, onChange, placeholder, required }) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full p-2 border rounded-md mt-1"
    />
  )
}

// Componente: Button
function Button({ children, type = "button", disabled, className = "", onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md font-medium transition-all ${disabled ? "opacity-60" : ""} ${className}`}
    >
      {children}
    </button>
  )
}

// Componente: Label
function Label({ htmlFor, children, className = "" }) {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium mb-1 ${className}`}>
      {children}
    </label>
  )
}

// Componente: Select y subcomponentes
function Select({ children, value, onChange }) {
  return (
    <select
      className="w-full p-2 border rounded-md mt-1"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {children}
    </select>
  )
}
function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>
}

export default function Login() {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [audiencia, setAudiencia] = useState("Cliente")
  const [membresia, setMembresia] = useState(0)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()

  const API_BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://opencoaching-back-tlfh.onrender.com"
      : "http://localhost:5000"

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")

    if (!isLogin && password !== confirmPassword) {
      setError("Las contraseñas no coinciden.")
      return
    }

    setIsLoading(true)

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/create/register"
      const payload = isLogin
        ? { email: email.toLowerCase(), password }
        : { nombre, email: email.toLowerCase(), password, rol: "user", membresia }

      const response = await axios.post(`${API_BASE_URL}${endpoint}`, payload)

      if (response.status === 201) {
        if (response.data.subscriptionUrl) {
          window.location.href = response.data.subscriptionUrl
        } else {
          setSuccessMessage("Cuenta creada exitosamente. ¡Ahora puedes iniciar sesión!")
          setNombre("")
          setEmail("")
          setPassword("")
          setConfirmPassword("")
          setIsLogin(true)
        }
      } else if (response.status === 200) {
        const { token } = response.data
        localStorage.setItem("token", token)
        localStorage.setItem("email", email.toLowerCase())
        navigate("/Dashboard")
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error en el proceso. Intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <img
        src="/logo.png"
        alt="Logo OpenCoaching"
        width={300}
        height={100}
        className="mx-auto mb-8 w-full max-w-[250px] sm:max-w-[300px]"
      />

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-[#09263b]">
            {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <p className="text-red-600 text-center mb-4 p-2 bg-red-100 rounded-md border border-red-300">
              {error}
            </p>
          )}
          {successMessage && (
            <p className="text-green-600 text-center mb-4 p-2 bg-green-100 rounded-md border border-green-300">
              {successMessage}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                <div>
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="audiencia">Soy</Label>
                  <Select value={audiencia} onChange={setAudiencia}>
                    <SelectItem value="Cliente">Cliente</SelectItem>
                    <SelectItem value="Coach Certificado">Coach</SelectItem>
                  </Select>
                </div>

                {audiencia !== "Cliente" && (
                  <div>
                    <Label htmlFor="membresia">Membresía</Label>
                    <Select value={String(membresia)} onChange={(value) => setMembresia(Number(value))}>
                      <SelectItem value="0">Gratis</SelectItem>
                      <SelectItem value="1">Básico</SelectItem>
                    </Select>
                  </div>
                )}
              </>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <Label htmlFor="confirmPassword">Repetir Contraseña</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#00af6b] text-white hover:bg-[#03c77d]"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Procesando...
                </div>
              ) : isLogin ? (
                "Iniciar Sesión"
              ) : (
                "Registrarse"
              )}
            </Button>
          </form>

          <p className="text-center text-sm mt-6 text-gray-500">
            {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes una cuenta?"}{" "}
            <span
              className="text-[#00af6b] underline cursor-pointer hover:text-[#03c77d]"
              onClick={() => {
                setError("")
                setSuccessMessage("")
                setIsLogin(!isLogin)
              }}
            >
              {isLogin ? "Crear Cuenta" : "Iniciar Sesión"}
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
