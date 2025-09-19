import { AppDataSource } from "../config/data-base";
import { AnswerEntity } from "../entities/AnswerEntity";
import { AnswerRepository } from "../../domain/AnswerPorts";
import { CreateAnswerDTO, UpdateAnswerDTO } from "../DTO/AnswerDTO";

export class AnswerAdapter implements AnswerRepository {
  private repo = AppDataSource.getRepository(AnswerEntity);

  async create(data: CreateAnswerDTO) {
    const newAnswer = this.repo.create(data);
    return await this.repo.save(newAnswer);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findById(id: number) {
    return await this.repo.findOneBy({ id });
  }

  async findByStudent(idEstudiante: number) {
    return await this.repo.find({ where: {idEstudiante} });
  }

  async update(id: number, data: UpdateAnswerDTO) {
    await this.repo.update(id, data);
    return await this.findById(id);
  }

  async delete(id: number) {
    const result = await this.repo.delete(id);
    return result.affected ? true : false;
  }
}