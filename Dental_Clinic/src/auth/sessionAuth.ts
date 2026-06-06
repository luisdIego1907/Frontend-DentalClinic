import type { RoleCode } from "../config/roles";

const TOKEN_KEY = "auth_token";
const EXPIRES_KEY = "auth_expires";
const ROLES_KEY = "auth_roles";

export function saveSession(token: string, expiresIn: string): void {
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(EXPIRES_KEY, expiresIn);
}

export function saveRoles(roles: RoleCode[]): void {
  sessionStorage.setItem(ROLES_KEY, JSON.stringify(roles));
}

export function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function getRoles(): RoleCode[] {
  const storedRoles = sessionStorage.getItem(ROLES_KEY);

  if (!storedRoles) return [];

  try {
    return JSON.parse(storedRoles) as RoleCode[];
  } catch {
    return [];
  }
}

export function clearSession(): void {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(EXPIRES_KEY);
  sessionStorage.removeItem(ROLES_KEY);
}

export function isAuthenticated(): boolean {
  const token = sessionStorage.getItem(TOKEN_KEY);
  const expiresIn = sessionStorage.getItem(EXPIRES_KEY);

  if (!token || !expiresIn) return false;

  return new Date(expiresIn).getTime() > Date.now();
}