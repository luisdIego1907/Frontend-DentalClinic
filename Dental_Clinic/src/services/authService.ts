import { saveSession } from "../auth/sessionAuth";
import type { LoginRequest, LoginResponse } from "../auth/Login";
import { config } from "../config";

const API_URL = `${config.api.url}/api`;

export async function loginUser(request: LoginRequest): Promise<void> {
  const response = await fetch(`${API_URL}/authorization/authorize`, {
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

  const token = data.bearerToken ?? data.BearerToken;
  const expiresIn = data.expiresIn ?? data.ExpiresIn;

  if (!token || !expiresIn) {
    throw new Error("El backend no devolvió un token válido");
  }

  saveSession(token, expiresIn);
}
