// src/application/dto/CreateNotificacionDTO.ts
export interface CreateNotificacionDTO {
  idEstudiante: number;
  idProfesional?: number | null;
  mensaje: string;
}

// src/application/dto/UpdateNotificacionDTO.ts
export interface UpdateNotificacionDTO {
  idNotificacion: number;
  mensaje?: string;
  leido?: boolean;
}