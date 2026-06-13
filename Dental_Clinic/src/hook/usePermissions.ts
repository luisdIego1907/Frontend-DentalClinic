// src/hook/usePermissions.ts
import { getRoles } from "../auth/sessionAuth";
import { permissions } from "../config/permissions";
import type { Permissions } from "../config/permissions";
import type { RoleCode } from "../config/roles";


type FrontendRole = keyof typeof permissions;

// Define los permisos por defecto. cuando el usuario no tiene rol ono se encuentra un rol válido,
const defaultPermissions: Permissions = {
  editarPerfil: false,
  verConsultas: false,
  registrarConsulta: false,
};

// Mapea los roles que vienen del backend a los n usados en el front
const roleMap: Record<RoleCode, FrontendRole> = {
  ADMIN: "admin",
  ODO: "odontologist",
  ASSIS: "assistant",
};

export function usePermissions(): Permissions {
  const roles = getRoles();

  const firstRole = roles[0];

  if (!firstRole) return defaultPermissions;

  const frontendRole = roleMap[firstRole];

  return permissions[frontendRole] ?? defaultPermissions;
}