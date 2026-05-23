// Esta clase es un mock de autenticación para pruebas unitarias
// Mientras se implementa el backend y la lógica de autenticación real, esta clase simula el comportamiento de un servicio de autenticación

export const mockUsers = [
  { email: "admin@dental.com", password: "Admin123", rol: "admin" },
  { email: "recepcion@dental.com", password: "Recep123", rol: "recepcionista" },
  { email: "doctor@dental.com", password: "Doctor123", rol: "odontologo" },
];
