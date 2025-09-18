import { Request, Response } from "express";
import { SurveyApplicationService } from "../../application/SurveyApplicationService";
import { CreateSurveyDTO, UpdateSurveyDTO } from "../DTO/SurveyDTO";

export class SurveyController {
  private app: SurveyApplicationService;

  constructor(app: SurveyApplicationService) {
    this.app = app;
  }

  async createSurvey(request: Request, response: Response): Promise<Response> {
    try {
      const { titulo, descripcion } = request.body as CreateSurveyDTO;

      if (!titulo || titulo.trim().length < 3) {
        return response.status(400).json({ error: "El título es requerido (mínimo 3 caracteres)" });
      }

      const survey = await this.app.create({ titulo, descripcion });
      return response.status(201).json({ message: "Encuesta creada", survey });
    } catch (error) {
      return response.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getAllSurveys(_request: Request, response: Response): Promise<Response> {
    try {
      const surveys = await this.app.findAll();
      return response.status(200).json(surveys);
    } catch (error) {
      return response.status(500).json({ message: "Error en el servidor" });
    }
  }

  async getSurveyById(request: Request, response: Response): Promise<Response> {
    try {
      const id = parseInt(request.params.id);
      if (isNaN(id)) return response.status(400).json({ error: "ID inválido" });

      const survey = await this.app.findById(id);
      if (!survey) return response.status(404).json({ message: "Encuesta no encontrada" });

      return response.status(200).json(survey);
    } catch (error) {
      return response.status(500).json({ message: "Error en el servidor" });
    }
  }

  async updateSurvey(request: Request, response: Response): Promise<Response> {
    try {
      const id = parseInt(request.params.id);
      if (isNaN(id)) return response.status(400).json({ error: "ID inválido" });

      const data: UpdateSurveyDTO = request.body;
      const updated = await this.app.update(id, data);

      if (!updated) return response.status(404).json({ message: "Encuesta no encontrada" });

      return response.status(200).json({ message: "Encuesta actualizada", updated });
    } catch (error) {
      return response.status(500).json({ message: "Error en el servidor" });
    }
  }

  async deleteSurvey(request: Request, response: Response): Promise<Response> {
    try {
      const id = parseInt(request.params.id);
      if (isNaN(id)) return response.status(400).json({ error: "ID inválido" });

      const deleted = await this.app.delete(id);
      if (!deleted) return response.status(404).json({ message: "Encuesta no encontrada" });

      return response.status(200).json({ message: "Encuesta eliminada correctamente" });
    } catch (error) {
      return response.status(500).json({ message: "Error en el servidor" });
    }
  }
}