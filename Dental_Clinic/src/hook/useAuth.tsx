// src/hooks/useAuth.ts
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
    if (user.rol === "recepcionista") navigate("/recepcionista");
    if (user.rol === "odontologo") navigate("/odontologo");
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return { getUser, goHome, logout };
}
