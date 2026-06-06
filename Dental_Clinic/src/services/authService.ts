// saveSession guarda el token y la fecha de expiración.
import {
  saveSession,
  saveRoles,
} from "../auth/sessionAuth";
import { config } from "../config";
import { VALID_ROLES, type RoleCode } from "../config/roles";
// LoginRequest representa lo que se envía al backend.
// LoginResponse representa lo que responde el backend.
import type { LoginRequest, LoginResponse } from "../auth/Login";

const LOGIN_URL = `${config.api.url}/api/authorization/authorize`;

interface JwtPayload {
  externalId?: string;
  unique_name?: string;
  name?: string;
}

//  estructura esperada de la respuesta del endpoint de roles.
interface RolesResponse {
  roles: string[];
}

// Decodifica el payload del JWT.
// El JWT tiene tres partes header.payload.signature
// toma el payload.
function decodeJwtPayload(token: string): JwtPayload {

  const payload = token.split(".")[1];

  // Si no existe payload, el token no tiene una estructura válida.
  if (!payload) {
    throw new Error("Token inválido");
  }

  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  const paddedBase64 = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "="
  );

  return JSON.parse(atob(paddedBase64));
}

function normalizeRoles(roles: string[]): RoleCode[] {
  return roles
    .map((role) => role.trim().toUpperCase())
    .filter((role): role is RoleCode =>
      VALID_ROLES.includes(role as RoleCode)
    );
}

async function getUserRoles(
  userId: string,
  token: string
): Promise<RoleCode[]> {
  const response = await fetch(`${config.api.url}/api/users/${userId}/roles`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudieron obtener los roles del usuario");
  }

  const data: RolesResponse = await response.json();

  return normalizeRoles(data.roles);
}

export async function loginUser(request: LoginRequest): Promise<void> {
  const response = await fetch(LOGIN_URL, {
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

  // Convierte la respuesta del backend a objeto.
  const data: LoginResponse = await response.json();

  // Extrae el token de la respuesta.
  const token = data.bearerToken;
  const expiresIn = data.expiresIn;

  if (!token || !expiresIn) {
    throw new Error("El backend no devolvió token o expiración");
  }

  const payload = decodeJwtPayload(token);

  if (!payload.externalId) {
    throw new Error("El token no contiene el identificador del usuario");
  }

  // Guarda el token y la expiración en sessionStorage.
  saveSession(token, expiresIn);

  const roles = await getUserRoles(payload.externalId, token);

  //console.log("Roles obtenidos desde backend:", roles);

  if (roles.length === 0) {
    throw new Error("El usuario no tiene roles asignados");
  }

   // Guarda los roles en sessionStorage. Luego ProtectedRoute, Header y usePermissions pueden leerlos
  saveRoles(roles);
}