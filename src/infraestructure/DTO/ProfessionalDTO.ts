export class ProfessionalDTO {
  id_profesional?: number;
  nombre!: string;
  apellido!: string;
  correo!: string;
  contrasena!: string;
  fecha_registro?: Date;

  constructor(data: Partial<ProfessionalDTO>) {
    Object.assign(this, data);
  }
}