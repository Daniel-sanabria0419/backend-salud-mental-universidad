// Crear pregunta
export interface CreateQuestionDTO {
  idEncuesta: number;
  texto: string;
  idTipoPregunta: number;
}

// Actualizar pregunta
export interface UpdateQuestionDTO {
  texto?: string;
  idTipoPregunta?: number;
}