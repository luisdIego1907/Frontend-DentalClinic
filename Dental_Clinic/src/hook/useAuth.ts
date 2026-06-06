// src/hooks/useAuth.ts
// Se encarga de manejar la autenticación del usuario, obteniendo su información y redirigiendo según su rol

import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();

  const getUser = () => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  };

  const goHome = () => {
    const user = getUser();
    if (!user) {
      navigate("/");
      return;
    }
    if (user.rol === "admin") navigate("/admin");
    if (user.rol === "assistant") navigate("/assistant");
    if (user.rol === "odontologist") navigate("/odontologist");
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return { getUser, goHome, logout };
}
