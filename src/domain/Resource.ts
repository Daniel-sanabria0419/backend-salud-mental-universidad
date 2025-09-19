export interface Resource {
    id: number;
    titulo: string;
    descripcion?: string;
    tipo: string;
    url?: string;
    idProfesional: number;
    fechaPublicacion: Date;
}