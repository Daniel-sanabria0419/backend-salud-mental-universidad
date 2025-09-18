export interface Survey {
  id: number;
  titulo: string;
  descripcion?: string;
  fecha_creacion: Date;
  estado: boolean;
}