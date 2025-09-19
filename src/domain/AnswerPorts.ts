import { Answer } from "./Answer";
import { CreateAnswerDTO, UpdateAnswerDTO } from "../infraestructure/DTO/AnswerDTO";

export interface AnswerRepository {
  create(data: CreateAnswerDTO): Promise<Answer>;
  findAll(): Promise<Answer[]>;
  findById(id: number): Promise<Answer | null>;
  findByStudent(idEstudiante: number): Promise<Answer[] | null>;

  update(id: number, data: UpdateAnswerDTO): Promise<Answer | null>;
  delete(id: number): Promise<boolean>;
}