import { getToken, clearSession } from "../auth/sessionAuth";

export async function apiClient<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
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

  return await response.json();
}

