import { QuestionRepository } from "../domain/QuestionPorts";
import { CreateQuestionDTO, UpdateQuestionDTO } from "../infraestructure/DTO/QuestionDTO";

export class QuestionApplicationService {
  constructor(private questionRepo: QuestionRepository) {}

  create(data: CreateQuestionDTO) {
    return this.questionRepo.create(data);
  }

  findAll() {
    return this.questionRepo.findAll();
  }

  findById(id: number) {
    return this.questionRepo.findById(id);
  }

  update(id: number, data: UpdateQuestionDTO) {
    return this.questionRepo.update(id, data);
  }

  delete(id: number) {
    return this.questionRepo.delete(id);
  }
}