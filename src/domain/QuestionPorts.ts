import { Question } from "./Question";
import { CreateQuestionDTO, UpdateQuestionDTO } from "../infraestructure/DTO/QuestionDTO";

export interface QuestionRepository {
  create(data: CreateQuestionDTO): Promise<Question>;
  findAll(): Promise<Question[]>;
  findById(id: number): Promise<Question | null>;
  update(id: number, data: UpdateQuestionDTO): Promise<Question | null>;
  delete(id: number): Promise<void>;
  findAllBySurveyId(id: number): Promise<Question[]>;
}