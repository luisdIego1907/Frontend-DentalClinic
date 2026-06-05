import { useNavigate } from "react-router-dom";
import { clearSession, getRoles, isAuthenticated } from "../auth/sessionAuth";

export function useAuth() {
  const navigate = useNavigate();

  const goHome = () => {
    if (!isAuthenticated()) {
      navigate("/", { replace: true });
      return;
    }

    const roles = getRoles();

    if (roles.includes("ADMIN")) {
      navigate("/admin", { replace: true });
      return;
    }

    if (roles.includes("ODO")) {
      navigate("/odontologist", { replace: true });
      return;
    }

    if (roles.includes("ASSIS")) {
      navigate("/assistant", { replace: true });
      return;
    }

    navigate("/", { replace: true });
  };

  const logout = () => {
    clearSession();
    navigate("/", { replace: true });
  };

  return {
    goHome,
    logout,
    isAuthenticated,
  };
}