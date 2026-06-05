// src/services/authService.ts

import { saveSession, type RoleCode } from "../auth/sessionAuth";
import { config } from "../config";

const API_URL = `${config.api.url}/api/authorization/authorize`;

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  bearerToken: string;
  expiresIn: string;
}

interface JwtPayload {
  role?: string | string[];
  roles?: string | string[];
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?:
    | string
    | string[];
}

function decodeToken(token: string): JwtPayload {
  const payload = token.split(".")[1];

  const decodedPayload = atob(
    payload.replace(/-/g, "+").replace(/_/g, "/")
  );

  return JSON.parse(decodedPayload);
}

function normalizeRoles(roleClaim: string | string[] | undefined): RoleCode[] {
  if (!roleClaim) return [];

  const roles = Array.isArray(roleClaim) ? roleClaim : [roleClaim];

  return roles
    .map((role) => role.trim().toUpperCase())
    .filter((role): role is RoleCode =>
      ["ADMIN", "ODO", "ASSIS"].includes(role)
    );
}

export async function loginUser(request: LoginRequest): Promise<void> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: request.username,
      password: request.password,
    }),
  });

  if (!response.ok) {
    throw new Error("Credenciales incorrectas");
  }

  const data: LoginResponse = await response.json();

  const token = data.bearerToken;
  const expiresIn = data.expiresIn;

  if (!token || !expiresIn) {
    throw new Error("El backend no devolvió token o fecha de expiración");
  }

  const payload = decodeToken(token);

  const roleClaim =
    payload.roles ??
    payload.role ??
    payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  const roles = normalizeRoles(roleClaim);

  if (roles.length === 0) {
    throw new Error("El token no contiene roles válidos");
  }

  saveSession(token, expiresIn, roles);
}