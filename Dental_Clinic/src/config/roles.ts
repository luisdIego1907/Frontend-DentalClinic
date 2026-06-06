// Define los códigos oficiales de roles usados por el frontend.
// Estos tienen que coincidir con los roles que devuelve el backend.
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

// Relaciona cada rol con su ruta principal.
// Esto evita tener rutas quemadas en varios archivos.
export const ROLE_HOME_PATH: Record<RoleCode, string> = {
  ADMIN: "/admin",
  ODO: "/odontologist",
  ASSIS: "/assistant",
};

// Relaciona cada rol con un nombre legible para mostrar en pantalla. Por ejemplo, en el Header.
export const ROLE_LABEL: Record<RoleCode, string> = {
  ADMIN: "Administrador",
  ODO: "Odontólogo",
  ASSIS: "Recepcionista",
};