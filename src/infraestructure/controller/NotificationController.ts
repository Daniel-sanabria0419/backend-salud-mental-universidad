import { Request, Response } from "express";
import { NotificationApplicationService } from "../../application/NotificationApplicationService";
import { CreateNotificationDTO, UpdateNotificationDTO } from "../DTO/NotificationDTO";

export class NotificationController {
  private app: NotificationApplicationService;

  constructor(app: NotificationApplicationService) {
    this.app = app;
  }

  // Crear notificación
  async createNotification(request: Request, response: Response): Promise<Response> {
    try {
      const { idEstudiante, idProfesional, mensaje } = request.body as CreateNotificationDTO;

      if (!idEstudiante || !mensaje) {
        return response.status(400).json({ error: "idEstudiante y mensaje son requeridos" });
      }

      if (typeof mensaje !== "string" || mensaje.trim().length < 3) {
        return response.status(400).json({ error: "El mensaje debe tener al menos 3 caracteres" });
      }

      const notification = await this.app.create({ idEstudiante, idProfesional, mensaje });
      return response.status(201).json({ message: "Notificación creada correctamente", notification });
    } catch (error) {
      return response.status(500).json({ message: "Error en el servidor" });
    }
  }

  // Obtener todas las notificaciones
  async getAllNotifications(_request: Request, response: Response): Promise<Response> {
    try {
      const notifications = await this.app.findAll();
      return response.status(200).json(notifications);
    } catch (error) {
      return response.status(500).json({ message: "Error en el servidor" });
    }
  }

  // Obtener notificación por ID
  async getNotificationById(request: Request, response: Response): Promise<Response> {
    try {
      const id = parseInt(request.params.id);
      if (isNaN(id)) {
        return response.status(400).json({ message: "ID inválido" });
      }

      const notification = await this.app.findById(id);
      if (!notification) {
        return response.status(404).json({ message: "Notificación no encontrada" });
      }

      return response.status(200).json(notification);
    } catch (error) {
      return response.status(500).json({ message: "Error en el servidor" });
    }
  }

  // Actualizar notificación
  async updateNotification(request: Request, response: Response): Promise<Response> {
    try {
      const id = parseInt(request.params.id);
      if (isNaN(id)) {
        return response.status(400).json({ message: "ID inválido" });
      }

      const data: UpdateNotificationDTO = request.body;
      const updated = await this.app.update(id, data);

      if (!updated) {
        return response.status(404).json({ message: "Notificación no encontrada" });
      }

      return response.status(200).json({ message: "Notificación actualizada con éxito", updated });
    } catch (error) {
      return response.status(500).json({ message: "Error en el servidor" });
    }
  }

  // Eliminar (o marcar como leída)
  async deleteNotification(request: Request, response: Response): Promise<Response> {
    try {
      const id = parseInt(request.params.id);
      if (isNaN(id)) {
        return response.status(400).json({ message: "ID inválido" });
      }

      const deleted = await this.app.delete(id);

      if (!deleted) {
        return response.status(404).json({ message: "Notificación no encontrada" });
      }

      return response.status(200).json({ message: "Notificación eliminada correctamente" });
    } catch (error) {
      return response.status(500).json({ message: "Error en el servidor" });
    }
  }
}