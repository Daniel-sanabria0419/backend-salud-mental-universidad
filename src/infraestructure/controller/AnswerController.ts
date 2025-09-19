import { Request, Response } from "express";
import { AnswerApplicationService } from "../../application/AnswerApplicationService";
import { CreateAnswerDTO, UpdateAnswerDTO } from "../DTO/AnswerDTO";

export class AnswerController {
  private app: AnswerApplicationService;

  constructor(app: AnswerApplicationService) {
    this.app = app;
  }

  async createAnswer(req: Request, res: Response): Promise<Response> {
    try {
      const { idEstudiante, idPregunta, idOpcion } = req.body as CreateAnswerDTO;

      if (!idEstudiante || !idPregunta || !idOpcion) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
      }

      const answer = await this.app.create({ idEstudiante, idPregunta, idOpcion });
      return res.status(201).json({ message: "Respuesta registrada", answer });
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getAllAnswers(_req: Request, res: Response): Promise<Response> {
    try {
      const answers = await this.app.findAll();
      return res.status(200).json(answers);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getAnswerById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      const answer = await this.app.findById(id);
      if (!answer) return res.status(404).json({ message: "Respuesta no encontrada" });

      return res.status(200).json(answer);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

async getAnswerByStudent(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      const answer = await this.app.findByStudent(id);
      if (!answer) return res.status(404).json({ message: "Respuesta no encontrada" });

      return res.status(200).json(answer);
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }


  async updateAnswer(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      const data: UpdateAnswerDTO = req.body;
      const updated = await this.app.update(id, data);

      if (!updated) return res.status(404).json({ message: "Respuesta no encontrada" });

      return res.status(200).json({ message: "Respuesta actualizada", updated });
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }

  async deleteAnswer(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      const deleted = await this.app.delete(id);
      if (!deleted) return res.status(404).json({ message: "Respuesta no encontrada" });

      return res.status(200).json({ message: "Respuesta eliminada correctamente" });
    } catch (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
  }
}