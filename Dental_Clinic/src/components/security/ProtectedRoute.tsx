import { Navigate } from "react-router-dom";
import { getRoles, isAuthenticated } from "../../auth/sessionAuth";

type RoleCode = "ADMIN" | "ODO" | "ASSIS";

interface ProtectedRouteProps {
  children: React.ReactNode;
  rol?: RoleCode | RoleCode[];
}

export default function ProtectedRoute({ children, rol }: ProtectedRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  if (!rol) {
    return <>{children}</>;
  }

  const userRoles = getRoles();
  const allowedRoles = Array.isArray(rol) ? rol : [rol];

  const hasPermission = allowedRoles.some((allowedRole) =>
    userRoles.includes(allowedRole)
  );

  if (!hasPermission) {
    if (userRoles.includes("ADMIN")) {
      return <Navigate to="/admin" replace />;
    }

    if (userRoles.includes("ODO")) {
      return <Navigate to="/odontologist" replace />;
    }

    if (userRoles.includes("ASSIS")) {
      return <Navigate to="/assistant" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}