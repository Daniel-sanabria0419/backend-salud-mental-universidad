import { Question } from "./Question";
import { CreateQuestionDTO, UpdateQuestionDTO } from "../infraestructure/DTO/QuestionDTO";

export interface QuestionRepository {
  create(data: CreateQuestionDTO): Promise<Question>;
  findAll(): Promise<Question[]>;
  findById(id: number): Promise<Question | null>;
  update(id: number, data: UpdateQuestionDTO): Promise<Question | null>;
<<<<<<< HEAD
  delete(id: number): Promise<boolean>;
=======
  delete(id: number): Promise<void>;
  findAllBySurveyId(id: number): Promise<Question[]>;
>>>>>>> 2b14ab01396e9883608d676b6e1ff018bea2a53f
}