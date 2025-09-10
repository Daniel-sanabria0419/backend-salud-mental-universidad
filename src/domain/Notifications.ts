export interface Notification {
    id: number;
    idEstudiante: number;
    idProfesional?: number | null;
    mensaje: string;
    fecha: Date;
    leido: boolean;
}