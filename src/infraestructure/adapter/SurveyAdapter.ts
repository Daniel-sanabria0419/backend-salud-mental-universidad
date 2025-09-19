import { AppDataSource } from "../config/data-base";
import { SurveyEntity } from "../entities/SurveyEntity";
import { SurveyRepository } from "../../domain/SurveyPorts";
import { CreateSurveyDTO, UpdateSurveyDTO } from "../DTO/SurveyDTO";

export class SurveyAdapter implements SurveyRepository {
  private repo = AppDataSource.getRepository(SurveyEntity);

  async create(data: CreateSurveyDTO) {
    const newSurvey = this.repo.create(data);
    return await this.repo.save(newSurvey);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findById(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async update(id: number, data: UpdateSurveyDTO) {
    await this.repo.update(id, data);
    return await this.findById(id);
  }

  async delete(id: number) {
    const result = await this.repo.delete(id);
    return result.affected ? true : false;
  }
}