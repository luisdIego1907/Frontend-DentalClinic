export interface Permissions {
  editarPerfil: boolean;
  verConsultas: boolean;
  registrarConsulta: boolean;
}

export const permissions: Record<string, Permissions> = {
  odontologist: {
    editarPerfil: false,
    verConsultas: true,
    registrarConsulta: true,
  },

  assistant: {
    editarPerfil: true,
    verConsultas: false,
    registrarConsulta: false,
  },
  admin: {
    editarPerfil: true,
    verConsultas: true,
    registrarConsulta: true,
  },
};
