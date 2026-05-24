import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "../../mocks/auth.mock";
import { useAuth } from "../../hook/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { goHome } = useAuth(); // Para redirigir al home despues de logearse

  // Si ya hay sesión activa, redirige al home del rol
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) goHome();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = mockUsers.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      alert("Credenciales incorrectas");
      return;
    }

    // Guardar sesión -- Ejemplo si alguien ya esta dentro y vuelve a login no le pide volver ingresar credenciales
    localStorage.setItem("user", JSON.stringify(user));

    if (user.rol === "admin") navigate("/admin");
    if (user.rol === "recepcionista") navigate("/recepcionista");
    if (user.rol === "odontologo") navigate("/odontologo");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image with overlay */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#1D9E75] to-[#158f68] items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1777444969135-caf869407707?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkZW50YWwlMjBjbGluaWMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzkzNzYwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1D9E75]/85 to-[#0f5d47]/90" />

        {/* Logo on Image */}
        <div className="relative z-10 text-center px-12">
          <div className="flex items-center justify-center mb-6">
            {/* Tooth Icon */}
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-lg"
            >
              <path
                d="M32 8C24 8 18 12 18 20C18 24 16 28 16 32C16 40 18 56 24 56C28 56 28 48 28 44C28 42 28 40 30 40H34C36 40 36 42 36 44C36 48 36 56 40 56C46 56 48 40 48 32C48 28 46 24 46 20C46 12 40 8 32 8Z"
                fill="white"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-semibold text-white mb-4 tracking-tight">
            DentalCare
          </h1>
          <p className="text-white/90 text-lg max-w-md mx-auto">
            Sistema de gestión interno para clínicas dentales
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12 bg-white">
        <div className="w-full max-w-md">
          {/* Logo for mobile */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <svg
              width="32"
              height="32"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 8C24 8 18 12 18 20C18 24 16 28 16 32C16 40 18 56 24 56C28 56 28 48 28 44C28 42 28 40 30 40H34C36 40 36 42 36 44C36 48 36 56 40 56C46 56 48 40 48 32C48 28 46 24 46 20C46 12 40 8 32 8Z"
                fill="#1D9E75"
              />
            </svg>
            <span className="ml-2 text-xl font-semibold text-foreground">
              DentalCare
            </span>
          </div>

          {/* Desktop Logo */}
          <div className="hidden lg:flex items-center mb-12">
            <svg
              width="28"
              height="28"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 8C24 8 18 12 18 20C18 24 16 28 16 32C16 40 18 56 24 56C28 56 28 48 28 44C28 42 28 40 30 40H34C36 40 36 42 36 44C36 48 36 56 40 56C46 56 48 40 48 32C48 28 46 24 46 20C46 12 40 8 32 8Z"
                fill="#1D9E75"
              />
            </svg>
            <span className="ml-2 text-lg font-medium text-foreground">
              DentalCare
            </span>
          </div>

          {/* Form Content */}
          <div>
            <h2 className="text-3xl font-medium text-foreground mb-3">
              Bienvenido
            </h2>
            <p className="text-muted-foreground text-sm mb-8">
              Ingresa tus credenciales para continuar
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all pr-12"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                    aria-label={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3.5 px-4 rounded-lg font-medium hover:bg-[#188968] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all shadow-sm hover:shadow-md"
              >
                Iniciar sesión
              </button>
            </form>

            {/* Footer text */}
            <div className="mt-8 text-center">
              <p className="text-xs text-muted-foreground">
                Sistema interno de Clinica Dental © 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
