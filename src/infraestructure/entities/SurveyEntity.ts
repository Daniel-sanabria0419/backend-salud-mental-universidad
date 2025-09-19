import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("encuestas")
export class SurveyEntity {
  @PrimaryGeneratedColumn({ name: "id_encuesta" })
  id!: number;

  @Column({ length: 200 })
  titulo!: string;

  @Column({ type: "text", nullable: true })
  descripcion?: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  fecha_creacion!: Date;

  @Column({ type: "boolean", default: true })
  estado!: boolean;
}