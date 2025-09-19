import { Request, Response } from "express";
import { QuestionApplicationService } from "../../application/QuestionApplicationService";
import { CreateQuestionDTO, UpdateQuestionDTO } from "../DTO/QuestionDTO";

export class QuestionController {
  private app: QuestionApplicationService;

  constructor(app: QuestionApplicationService) {
    this.app = app;
  }

  async createQuestion(request: Request, response: Response): Promise<Response> {
    try {
      const { idEncuesta, texto, idTipoPregunta } = request.body as CreateQuestionDTO;

      if (!idEncuesta || !texto || !idTipoPregunta) {
        return response.status(400).json({ error: "Todos los campos son requeridos" });
      }

      const question = await this.app.create({ idEncuesta, texto, idTipoPregunta });
      return response.status(201).json({ message: "Pregunta creada", question });
    } catch (error) {
      return response.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getAllQuestions(_req: Request, res: Response): Promise<Response> {
    try {
      const questions = await this.app.findAll();
      return res.status(200).json(questions);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

<<<<<<< HEAD
=======

  async questionsBySurveyId(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);

      const questions = await this.app.findAllBySurveyId(id);
      return res.status(200).json(questions);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

>>>>>>> 2b14ab01396e9883608d676b6e1ff018bea2a53f
  async getQuestionById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      const question = await this.app.findById(id);
      if (!question) return res.status(404).json({ message: "Pregunta no encontrada" });

      return res.status(200).json(question);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async updateQuestion(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      const data: UpdateQuestionDTO = req.body;
      const updated = await this.app.update(id, data);

      if (!updated) return res.status(404).json({ message: "Pregunta no encontrada" });

      return res.status(200).json({ message: "Pregunta actualizada", updated });
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async deleteQuestion(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      const deleted = await this.app.delete(id);
<<<<<<< HEAD
      if (!deleted) return res.status(404).json({ message: "Pregunta no encontrada" });
=======
      return res.status(404).json({ message: "Pregunta no encontrada" });
>>>>>>> 2b14ab01396e9883608d676b6e1ff018bea2a53f

      return res.status(200).json({ message: "Pregunta eliminada correctamente" });
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }
}