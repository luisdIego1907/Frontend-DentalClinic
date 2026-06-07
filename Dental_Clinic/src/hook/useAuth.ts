import { useNavigate } from "react-router-dom";
import { clearSession, getRoles, isAuthenticated } from "../auth/sessionAuth";
import { ROLE_HOME_PATH } from "../config/roles";

export function useAuth() {

  const navigate = useNavigate();

  const goHome = () => {

    // Primero valida si el usuario tiene una sesión activa. Si no tiene sesión, lo manda al login.
    if (!isAuthenticated()) {
      navigate("/", { replace: true });
      return;
    }

    const roles = getRoles();
    const firstRole = roles[0];

    // Si no existe ningún rol guardado se manda al login.
    if (!firstRole) {
      navigate("/", { replace: true });
      return;
    }

    // Redirige al home correspondiente según el rol.
    navigate(ROLE_HOME_PATH[firstRole], { replace: true });
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