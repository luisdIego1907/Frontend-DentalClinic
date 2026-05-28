// Se encarga de definir que puede hacer cada rol de usuario dentro de la aplicación
//Usar autenticación y autorizacion en el backend para controlar esta parte

import { permissions } from "../config/permissions";
import type { Permissions } from "../config/permissions";
import { useAuth } from "./useAuth";

const defaultPermissions: Permissions = {
  editarPerfil: false,
  verConsultas: false,
  registrarConsulta: false,
};

export function usePermissions(): Permissions {
  const { getUser } = useAuth();
  const user = getUser();

  if (!user?.rol) return defaultPermissions;

  return permissions[user.rol] ?? defaultPermissions;
}
