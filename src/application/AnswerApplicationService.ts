import { AnswerRepository } from "../domain/AnswerPorts";
import { CreateAnswerDTO, UpdateAnswerDTO } from "../infraestructure/DTO/AnswerDTO";

export class AnswerApplicationService {
  constructor(private answerRepo: AnswerRepository) {}

  create(data: CreateAnswerDTO) {
    return this.answerRepo.create(data);
  }

  findAll() {
    return this.answerRepo.findAll();
  }

  findById(id: number) {
    return this.answerRepo.findById(id);
  }

  findByStudent(id: number) {
    return this.answerRepo.findByStudent(id);
  }

  update(id: number, data: UpdateAnswerDTO) {
    return this.answerRepo.update(id, data);
  }

  delete(id: number) {
    return this.answerRepo.delete(id);
  }
}