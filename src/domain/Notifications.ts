export class Notificacion {
  constructor(
    public idNotificacion: number,
    public idEstudiante: number,
    public idProfesional: number | null,
    public mensaje: string,
    public fecha: Date,
    public leido: boolean
  ) {}
}