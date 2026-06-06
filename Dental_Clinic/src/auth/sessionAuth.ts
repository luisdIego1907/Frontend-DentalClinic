// Importa el tipo RoleCode desde el archivo central de roles.
// RoleCode limita los roles válidos "ADMIN", "ODO" y "ASSIS".
import type { RoleCode } from "../config/roles";

// Define la llave con la que se va a guardar el token en sessionStorage.
// El token es el JWT que devuelve el backend después de iniciar sesión.
const TOKEN_KEY = "auth_token";

// Define la llave con la que se va a guardar la fecha de expiración del token.
// Esta fecha sirve para saber si la sesión sigue activa o ya venció.
const EXPIRES_KEY = "auth_expires";
// Define la llave con la que se van a guardar los roles del usuario.
const ROLES_KEY = "auth_roles";

// Guarda la información principal de la sesión. Recibe el token y la fecha de expiración que vienen desde el backend.
export function saveSession(token: string, expiresIn: string): void {

  // Guarda el token JWT en sessionStorage.
  sessionStorage.setItem(TOKEN_KEY, token);
  // Guarda la fecha de expiración del token
  sessionStorage.setItem(EXPIRES_KEY, expiresIn);
}

// Guarda los roles del usuario autenticado.
export function saveRoles(roles: RoleCode[]): void {
  sessionStorage.setItem(ROLES_KEY, JSON.stringify(roles));
}

// Obtiene el token guardado en sessionStorage.
export function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function getRoles(): RoleCode[] {
  const storedRoles = sessionStorage.getItem(ROLES_KEY);

  if (!storedRoles) return [];

  try {
    // Convierte el string JSON de vuelta a un arreglo de RoleCode.'["ADMIN"]' pasa a ["ADMIN"].
    return JSON.parse(storedRoles) as RoleCode[];
  } catch {
    return [];
  }
}

// Limpia toda la información de sesión. Se usa  al cerrar sesión o cuando el token ya no es válido.
export function clearSession(): void {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(EXPIRES_KEY);
  sessionStorage.removeItem(ROLES_KEY);
}

export function isAuthenticated(): boolean {
  const token = sessionStorage.getItem(TOKEN_KEY);
  const expiresIn = sessionStorage.getItem(EXPIRES_KEY);

   // Si no hay token o no hay fecha de expiración, entonces no hay una sesión válida.
  if (!token || !expiresIn) return false;

  return new Date(expiresIn).getTime() > Date.now();
}