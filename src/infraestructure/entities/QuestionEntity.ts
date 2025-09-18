import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("preguntas")
export class QuestionEntity {
  @PrimaryGeneratedColumn({ name: "id_pregunta" })
  id!: number;

  @Column("int", { name: "id_encuesta" })
  idEncuesta!: number;

  @Column("text")
  texto!: string;

  @Column("int", { name: "id_tipo_pregunta" })
  idTipoPregunta!: number;
}