// Crear notificación
export interface CreateNotificationDTO {
    idEstudiante: number;
    idProfesional?: number | null;
    mensaje: string;
}

// Actualizar notificación
export interface UpdateNotificationDTO {
    mensaje?: string;
    leido?: boolean;
}