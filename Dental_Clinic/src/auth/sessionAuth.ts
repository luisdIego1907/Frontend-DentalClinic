// src/auth/sessionAuth.ts

const TOKEN_KEY = "auth_token";
const EXPIRES_KEY = "auth_expires";

export function saveSession(token: string, expiresIn: string): void {
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(EXPIRES_KEY, expiresIn);
}

export function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function clearSession(): void {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(EXPIRES_KEY);
}

export function isAuthenticated(): boolean {
  const token = sessionStorage.getItem(TOKEN_KEY);
  const expiresIn = sessionStorage.getItem(EXPIRES_KEY);

  if (!token || !expiresIn) return false;

  return new Date(expiresIn).getTime() > Date.now();
}