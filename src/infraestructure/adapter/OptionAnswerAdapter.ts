import { AppDataSource } from "../config/data-base";
import { OptionAnswerEntity } from "../entities/OptionAnswerEntity";
import { OptionAnswer } from "../../domain/OptionAnswer";
import { OptionAnswerRepository } from "../../domain/OptionAnswerPorts";

export class OptionAnswerAdapter implements OptionAnswerRepository {
  private repo = AppDataSource.getRepository(OptionAnswerEntity);

  async create(option: OptionAnswer): Promise<OptionAnswer> {
    const entity = this.repo.create(option);
    const saved = await this.repo.save(entity);
    return new OptionAnswer(saved.optionId, saved.questionId, saved.text, saved.value);
  }

  async findAll(): Promise<OptionAnswer[]> {
    const options = await this.repo.find();
    return options.map(o => new OptionAnswer(o.optionId, o.questionId, o.text, o.value));
  }

  async findById(id: number): Promise<OptionAnswer | null> {
    const o = await this.repo.findOneBy({ optionId: id });
    return o ? new OptionAnswer(o.optionId, o.questionId, o.text, o.value) : null;
  }

  async update(id: number, option: Partial<OptionAnswer>): Promise<OptionAnswer | null> {
    await this.repo.update({ optionId: id }, option);
    const updated = await this.repo.findOneBy({ optionId: id });
    return updated ? new OptionAnswer(updated.optionId, updated.questionId, updated.text, updated.value) : null;
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete({ optionId: id });
  }

  async findByQuestionId(questionId: number): Promise<OptionAnswer[]> {
    const options = await this.repo.findBy({ questionId });
    return options.map(o => new OptionAnswer(o.optionId, o.questionId, o.text, o.value));
  }
}