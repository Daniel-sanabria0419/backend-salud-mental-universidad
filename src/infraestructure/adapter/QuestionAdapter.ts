import { AppDataSource } from "../config/data-base";
import { QuestionEntity } from "../entities/QuestionEntity";
<<<<<<< HEAD
import { QuestionRepository } from "../../domain/QuestionPorts";
import { CreateQuestionDTO, UpdateQuestionDTO } from "../DTO/QuestionDTO";
=======
import { Question } from '../../domain/Question';
import { QuestionRepository } from "../../domain/QuestionPorts";
>>>>>>> 2b14ab01396e9883608d676b6e1ff018bea2a53f

export class QuestionAdapter implements QuestionRepository {
  private repo = AppDataSource.getRepository(QuestionEntity);

<<<<<<< HEAD
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
=======
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
>>>>>>> 2b14ab01396e9883608d676b6e1ff018bea2a53f
  }
}