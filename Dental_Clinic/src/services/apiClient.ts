import { getToken, clearSession } from "../auth/sessionAuth";

// Función genérica para hacer peticiones HTTP al backend.
export async function apiClient<T>(
  // url completo del endpoint al que se quiere llamar.
  url: string,
  options: RequestInit = {},
): Promise<T> {
  // Obtiene el token guardado en sessionStorage, guardado después del login.
  const token = getToken();

  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  // Ejecuta la petición HTTP usando fetch.
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

  // Si la respuesta sí tiene contenido, se convierte el JSON recibido al tipo esperado T.
  return (await response.json()) as T;
}
