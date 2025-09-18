import { SurveyRepository } from "../domain/SurveyPorts";
import { CreateSurveyDTO, UpdateSurveyDTO } from "../infraestructure/DTO/SurveyDTO";

export class SurveyApplicationService {
  constructor(private surveyRepo: SurveyRepository) {}

  create(data: CreateSurveyDTO) {
    return this.surveyRepo.create(data);
  }

  findAll() {
    return this.surveyRepo.findAll();
  }

  findById(id: number) {
    return this.surveyRepo.findById(id);
  }

  update(id: number, data: UpdateSurveyDTO) {
    return this.surveyRepo.update(id, data);
  }

  delete(id: number) {
    return this.surveyRepo.delete(id);
  }
}