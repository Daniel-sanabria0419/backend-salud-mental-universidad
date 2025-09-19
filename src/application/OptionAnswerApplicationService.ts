import { OptionAnswerRepository } from "../domain/OptionAnswerPorts";
import { CreateOptionAnswerDTO, UpdateOptionAnswerDTO } from "../infraestructure/DTO/OptionAnswerDTO";
import { OptionAnswer } from "../domain/OptionAnswer";

export class OptionAnswerApplicationService {
  constructor(private repo: OptionAnswerRepository) {}

  async create(dto: CreateOptionAnswerDTO): Promise<OptionAnswer> {
    const option = new OptionAnswer(0, dto.questionId, dto.text, dto.value);
    return this.repo.create(option);
  }

  async findAll(): Promise<OptionAnswer[]> {
    return this.repo.findAll();
  }

  async findById(id: number): Promise<OptionAnswer | null> {
    return this.repo.findById(id);
  }

  async update(id: number, dto: UpdateOptionAnswerDTO): Promise<OptionAnswer | null> {
    return this.repo.update(id, dto);
  }

  async delete(id: number): Promise<void> {
    return this.repo.delete(id);
  }

  async findByQuestionId(questionId: number): Promise<OptionAnswer[]> {
    return this.repo.findByQuestionId(questionId);
  }
}