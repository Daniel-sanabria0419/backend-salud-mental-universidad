import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("respuestas")
export class AnswerEntity {
  @PrimaryGeneratedColumn({ name: "id_respuesta" })
  id!: number;

  @Column("int", { name: "id_estudiante" })
  idEstudiante!: number;

  @Column("int", { name: "id_pregunta" })
  idPregunta!: number;

  @Column("int", { name: "id_opcion" })
  idOpcion!: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  fechaRespuesta!: Date;
}