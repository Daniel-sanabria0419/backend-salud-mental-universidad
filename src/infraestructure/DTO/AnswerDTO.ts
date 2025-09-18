// Crear respuesta
export interface CreateAnswerDTO {
  idEstudiante: number;
  idPregunta: number;
  idOpcion: number;
}

// Actualizar respuesta
export interface UpdateAnswerDTO {
  idOpcion?: number;
}