export interface NotasDTO {
    id_nota: number;
    id_estudiante: number;
    nota: string;
    fecha_creacion: Date;
}

export interface CreateNotaDTO {
    id_estudiante: number;
    nota: string;
}

export interface UpdateNotaDTO {
    nota: string;
}

export interface NotaResponseDTO {
    id_nota: number;
    id_estudiante: number;
    nota: string;
    fecha_creacion: string; // Formato ISO string para frontend
}