import { AppDataSource } from "../config/data-base";
import { QuestionEntity } from "../entities/QuestionEntity";
import { Question } from '../../domain/Question';
import { QuestionRepository } from "../../domain/QuestionPorts";

export class QuestionAdapter implements QuestionRepository {
  private repo = AppDataSource.getRepository(QuestionEntity);

  async create(question: Question): Promise<Question> {
    const entity = this.repo.create(question);
    const saved = await this.repo.save(entity);
    return new Question(saved.id, saved.idEncuesta, saved.texto, saved.idTipoPregunta);
  }

  async findAll(): Promise<Question[]> {
    const questions = await this.repo.find();
    return questions.map(
      q => new Question(q.id, q.idEncuesta, q.texto, q.idTipoPregunta)
    );
  }

  async findById(id: number): Promise<Question | null> {
    const q = await this.repo.findOneBy({ id });
    return q ? new Question(q.id, q.idEncuesta, q.texto, q.idTipoPregunta) : null;
  }

  async update(id: number, question: Partial<Question>): Promise<Question | null> {
    await this.repo.update({ id }, question);
    const updated = await this.repo.findOneBy({ id });
    return updated ? new Question(updated.id, updated.idEncuesta, updated.texto, updated.idTipoPregunta) : null;
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete({ id });
  }

  async findAllBySurveyId(idEncuesta: number): Promise<Question[]> {
    const questions = await this.repo.findBy({ idEncuesta });
    return questions.map(
      q => new Question(q.id, q.idEncuesta, q.texto, q.idTipoPregunta)
    );
  }
}