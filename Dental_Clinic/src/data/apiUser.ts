import { getToken, clearSession } from "../auth/sessionAuth";

export async function apiClient<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    clearSession();
    throw new Error("Sesión vencida o no autorizada");
  }

  if (response.status === 403) {
    throw new Error("No tiene permisos para realizar esta acción");
  }

  if (!response.ok) {
    throw new Error("Error en la petición");
  }

  if (response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
}