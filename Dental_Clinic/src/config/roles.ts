
export const RoleCodes = {
  Admin: "ADMIN",
  Odontologist: "ODO",
  Assistant: "ASSIS",
} as const;

export type RoleCode = (typeof RoleCodes)[keyof typeof RoleCodes];

export const VALID_ROLES: RoleCode[] = [
  RoleCodes.Admin,
  RoleCodes.Odontologist,
  RoleCodes.Assistant,
];

export const ROLE_HOME_PATH: Record<RoleCode, string> = {
  ADMIN: "/admin",
  ODO: "/odontologist",
  ASSIS: "/assistant",
};

export const ROLE_LABEL: Record<RoleCode, string> = {
  ADMIN: "Administrador",
  ODO: "Odontólogo",
  ASSIS: "Recepcionista",
};