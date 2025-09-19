// Crear encuesta
export interface CreateSurveyDTO {
  titulo: string;
  descripcion?: string;
}

// Actualizar encuesta
export interface UpdateSurveyDTO {
  titulo?: string;
  descripcion?: string;
  estado?: boolean;
}