import { useNavigate } from "react-router-dom";
import { clearSession, getToken, isAuthenticated } from "../auth/sessionAuth";


type RoleCode = "ADMIN" | "ODO" | "ASSIS";

interface JwtPayload {
  unique_name?: string;
  name?: string;
  externalId?: string;
  role?: string | string[];
  roles?: string | string[];
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?:
    | string
    | string[];
}

function decodeToken(): JwtPayload | null {
  const token = getToken();

  if (!token) return null;

  try {
    const payload = token.split(".")[1];

    const decodedPayload = atob(
      payload.replace(/-/g, "+").replace(/_/g, "/")
    );

    return JSON.parse(decodedPayload);
  } catch {
    return null;
  }
}

function normalizeRoles(roleClaim: string | string[] | undefined): RoleCode[] {
  if (!roleClaim) return [];

  const roles = Array.isArray(roleClaim) ? roleClaim : [roleClaim];

  return roles
    .map((role) => role.trim().toUpperCase())
    .filter((role): role is RoleCode =>
      ["ADMIN", "ODO", "ASSIS"].includes(role)
    );
}

export function useAuth() {
  const navigate = useNavigate();

  const getUser = () => {
    const payload = decodeToken();

    if (!payload) return null;

    const roleClaim =
      payload.roles ??
      payload.role ??
      payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    return {
      username: payload.unique_name ?? payload.name,
      externalId: payload.externalId,
      roles: normalizeRoles(roleClaim),
    };
  };

  const goHome = () => {
    const user = getUser();

    if (!isAuthenticated() || !user) {
      navigate("/", { replace: true });
      return;
    }

    if (user.roles.includes("ADMIN")) {
      navigate("/Admin", { replace: true });
      return;
    }

    if (user.roles.includes("ODO")) {
      navigate("/homeDentist", { replace: true });
      return;
    }

    if (user.roles.includes("ASSIS")) {
      navigate("/homeReceptionist", { replace: true });
      return;
    }

    navigate("/", { replace: true });
  };

  const logout = () => {
    clearSession();
    navigate("/", { replace: true });
  };

  return {
    getUser,
    goHome,
    logout,
    isAuthenticated,
  };
}