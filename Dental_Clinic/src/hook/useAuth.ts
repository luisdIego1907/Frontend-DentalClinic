import { useNavigate } from "react-router-dom";
import { clearSession, getRoles, isAuthenticated } from "../auth/sessionAuth";
import { ROLE_HOME_PATH } from "../config/roles";

export function useAuth() {

  const navigate = useNavigate();

  const goHome = () => {

    if (!isAuthenticated()) {
      navigate("/", { replace: true });
      return;
    }

    const roles = getRoles();
    const firstRole = roles[0];

    if (!firstRole) {
      navigate("/", { replace: true });
      return;
    }

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