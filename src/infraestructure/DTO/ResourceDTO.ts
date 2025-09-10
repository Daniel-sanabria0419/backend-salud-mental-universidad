export interface CreateResourceDTO {
    titulo: string;
    descripcion?: string;
    tipo: string;
    url?: string;
    idProfesional: number;
}

export interface UpdateResourceDTO {
    titulo?: string;
    descripcion?: string;
    tipo?: string;
    url?: string;
    idProfesional?: number;
}