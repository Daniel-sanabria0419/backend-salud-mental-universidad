import { AppDataSource } from "../config/data-base";
import { QuestionEntity } from "../entities/QuestionEntity";
import { QuestionRepository } from "../../domain/QuestionPorts";
import { CreateQuestionDTO, UpdateQuestionDTO } from "../DTO/QuestionDTO";

export class QuestionAdapter implements QuestionRepository {
  private repo = AppDataSource.getRepository(QuestionEntity);

  async create(data: CreateQuestionDTO) {
    const newQuestion = this.repo.create(data);
    return await this.repo.save(newQuestion);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findById(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async update(id: number, data: UpdateQuestionDTO) {
    await this.repo.update(id, data);
    return await this.findById(id);
  }

  async delete(id: number) {
    const result = await this.repo.delete(id);
    return result.affected ? true : false;
  }
}