export const TIPOS_USUARIO = {
  SUPERVISOR: 'A',
  TECNICO_SENIOR: 'B', 
  TECNICO_OPERATIVO: 'C'
};

export const PERMISOS = {
  [TIPOS_USUARIO.SUPERVISOR]: {
    puede_ver_todo: true,
    puede_generar_reportes: true,
    puede_administrar: true,
    puede_validar: true,
    puede_registrar: true,
    puede_inspeccionar: true
  },
  [TIPOS_USUARIO.TECNICO_SENIOR]: {
    puede_ver_todo: false,
    puede_generar_reportes: true,
    puede_administrar: false,
    puede_validar: true,
    puede_registrar: true,
    puede_inspeccionar: true
  },
  [TIPOS_USUARIO.TECNICO_OPERATIVO]: {
    puede_ver_todo: false,
    puede_generar_reportes: false,
    puede_administrar: false,
    puede_validar: false,
    puede_registrar: true,
    puede_inspeccionar: true
  }
};

export const puedeAcceder = (tipoUsuario, accion) => {
  return PERMISOS[tipoUsuario]?.[accion] || false;
};

export const esSupervisor = (tipoUsuario) => {
  return tipoUsuario === TIPOS_USUARIO.SUPERVISOR;
};

export const esTecnicoSenior = (tipoUsuario) => {
  return tipoUsuario === TIPOS_USUARIO.TECNICO_SENIOR;
};

export const esTecnicoOperativo = (tipoUsuario) => {
  return tipoUsuario === TIPOS_USUARIO.TECNICO_OPERATIVO;
};