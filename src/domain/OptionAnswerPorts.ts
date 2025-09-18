import { OptionAnswer } from "./OptionAnswer";

export interface OptionAnswerRepository {
  create(option: OptionAnswer): Promise<OptionAnswer>;
  findAll(): Promise<OptionAnswer[]>;
  findById(id: number): Promise<OptionAnswer | null>;
  update(id: number, option: Partial<OptionAnswer>): Promise<OptionAnswer | null>;
  delete(id: number): Promise<void>;
  findByQuestionId(questionId: number): Promise<OptionAnswer[]>;
}