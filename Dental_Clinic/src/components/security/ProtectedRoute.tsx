import { Navigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";

type Props = {
  children: React.ReactNode;
  rol?: string | string[]; // si se pasa, verifica el rol
};

export default function ProtectedRoute({ children, rol }: Props) {
  const { getUser } = useAuth();
  const user = getUser();

  // Si no hay sesión → login
  if (!user) return <Navigate to="/" replace />;

  // Si se especifica un rol y no coincide → login
  if (rol) {
    const roles = Array.isArray(rol) ? rol : [rol];
    if (!roles.includes(user.rol)) return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
