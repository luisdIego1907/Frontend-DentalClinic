import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../hook/useAuth";
import { loginUser } from "../../services/authService";
import { isAuthenticated } from "../../auth/sessionAuth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { goHome } = useAuth(); // Para redirigir al home despues de logearse

  // Si ya hay sesión activa, redirige al home del rol
  useEffect(() => {
    if (isAuthenticated()) {
      goHome();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setErrorMessage("");
      setIsSubmitting(true);

      await loginUser({
        username,
        password,
      });

      goHome();
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("No se pudo iniciar sesión");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Image with overlay */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#185FA5] to-[#0C447C] lg:flex lg:w-1/2 lg:items-center lg:justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1777444969135-caf869407707?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkZW50YWwlMjBjbGluaWMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzkzNzYwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#185FA5]/85 to-[#0C447C]/90" />

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

          <h1 className="mb-4 text-5xl font-semibold tracking-tight text-white">
            DentalCare
          </h1>

          <p className="text-white/90 text-lg max-w-md mx-auto">
            Sistema de gestión interno para clínicas dentales
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-1 items-center justify-center bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-12">
        <div className="w-full max-w-md">
          {/* Logo for mobile */}
          <div className="mb-8 flex items-center justify-center lg:hidden">
            <svg
              width="32"
              height="32"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 8C24 8 18 12 18 20C18 24 16 28 16 32C16 40 18 56 24 56C28 56 28 48 28 44C28 42 28 40 30 40H34C36 40 36 42 36 44C36 48 36 56 40 56C46 56 48 40 48 32C48 28 46 24 46 20C46 12 40 8 32 8Z"
                fill="#0C447C"
              />
            </svg>

            <span className="ml-2 text-xl font-semibold text-gray-900">
              DentalCare
            </span>
          </div>

          {/* Desktop Logo */}
          <div className="mb-12 hidden items-center lg:flex">
            <svg
              width="28"
              height="28"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 8C24 8 18 12 18 20C18 24 16 28 16 32C16 40 18 56 24 56C28 56 28 48 28 44C28 42 28 40 30 40H34C36 40 36 42 36 44C36 48 36 56 40 56C46 56 48 40 48 32C48 28 46 24 46 20C46 12 40 8 32 8Z"
                fill="#0C447C"
              />
            </svg>

            <span className="ml-2 text-lg font-medium text-gray-900">
              DentalCare
            </span>
          </div>

          {/* Form Content */}
          <div>
            <h2 className="mb-3 text-2xl font-medium text-gray-900 sm:text-3xl">
              Bienvenido
            </h2>

            <p className="mb-8 text-sm text-gray-500">
              Ingresa tus credenciales para continuar
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Input */}
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Usuario
                </label>

                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#185FA5]"
                  placeholder="Nombre de usuario"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Contraseña
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-12 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#185FA5]"
                    placeholder="••••••••"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 transition-colors hover:text-gray-900"
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

              {errorMessage && (
                <p className="text-sm text-red-600">{errorMessage}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="
w-full
bg-[#185FA5]
text-white
py-3.5
px-4
rounded-lg
font-medium
hover:bg-[#0C447C]
focus:outline-none
focus:ring-2
focus:ring-[#185FA5]
focus:ring-offset-2
transition-all
shadow-sm
hover:shadow-md
disabled:opacity-60
disabled:cursor-not-allowed
"
              >
                {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
              </button>
            </form>

            {/* Footer text */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500">
                Sistema interno de Clinica Dental © 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
