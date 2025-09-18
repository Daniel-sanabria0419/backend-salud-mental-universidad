import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("opcionesrespuesta")
export class OptionAnswerEntity {
  @PrimaryGeneratedColumn({ name: "id_opcion" })
  optionId!: number;

  @Column({ name: "id_pregunta" })
  questionId!: number;

  @Column({ name: "texto" })
  text!: string;

  @Column({ name: "valor" })
  value!: number;
}