// src/hook/usePermissions.ts
import { getRoles } from "../auth/sessionAuth";
import { permissions } from "../config/permissions";
import type { Permissions } from "../config/permissions";

type BackendRole = "ADMIN" | "ODO" | "ASSIS";
type FrontendRole = keyof typeof permissions;

const defaultPermissions: Permissions = {
  editarPerfil: false,
  verConsultas: false,
  registrarConsulta: false,
};

const roleMap: Record<BackendRole, FrontendRole> = {
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