import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("profesionales")
export class ProfessionalEntity {
  @PrimaryGeneratedColumn()
  id_profesional!: number;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ length: 100 })
  apellido!: string;

  @Column({ length: 150, unique: true })
  correo!: string;

  @Column({ length: 200 })
  contrasena!: string;

  @CreateDateColumn({ name: "fecha_registro" })
  fecha_registro!: Date;
}