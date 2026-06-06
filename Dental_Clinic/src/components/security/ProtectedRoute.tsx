import { Navigate } from "react-router-dom";
/*
  getRoles obtieen los roles guardados en sessionStorage
  isAuthenticated vveerifica si exit4e una sesion valida
*/ 
import { getRoles, isAuthenticated } from "../../auth/sessionAuth";
/*
  Limita los roles validos a los definidos en roles.ts
*/ 
import { ROLE_HOME_PATH, type RoleCode } from "../../config/roles";

interface ProtectedRouteProps {
  //children representa al componente o el contenido que se queire proteger
  // <HomeAdmin/> , <PatientLists/>
  children: React.ReactNode;

  //puede recibir un rol o un arreglo de varios roles
  rol?: RoleCode | RoleCode[];
}

export default function ProtectedRoute({ children, rol }: ProtectedRouteProps) {

  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  //Si no se especifica un rol para la ruta,basta con estar autenticado
  if (!rol) {
    return <>{children}</>;
  }

  const userRoles = getRoles();
  const allowedRoles = Array.isArray(rol) ? rol : [rol];

   // Verifica si el usuario tiene al menos uno de los roles permitidos.
  const hasPermission = allowedRoles.some((allowedRole) =>
    userRoles.includes(allowedRole)
  );

  // Si el usuario tiene permiso, renderiza el contenido protegido.
 if (hasPermission) {
    return <>{children}</>;
  }
 // Si el usuario está autenticado, pero no tiene permiso para esta ruta,
  // se obtiene su primer rol para redirigirlo a su home correspondiente.
  const firstRole = userRoles[0];

  // Si existe un rol válido, se usa ROLE_HOME_PATH para obtener la ruta.
  // Ejemplo
  // firstRole = "ODO"
  // ROLE_HOME_PATH["ODO"] = "/odontologist"
  if (firstRole) {
    return <Navigate to={ROLE_HOME_PATH[firstRole]} replace />;
  }

  // Si por alguna razón el usuario no tiene roles guardados,
  // se redirige al login.
  return <Navigate to="/" replace />;
}