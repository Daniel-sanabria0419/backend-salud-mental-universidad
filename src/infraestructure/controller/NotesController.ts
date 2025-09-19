import { NotesApplicationService } from "../../application/NotesApplicationService";
import { Request, Response } from "express";
import { Notes } from "../../domain/Notes";

export class NotasController {
  private app: NotesApplicationService;

  constructor(app: NotesApplicationService) {
    this.app = app;
  }

  async createNota(request: Request, response: Response): Promise<Response> {
    const { id_estudiante, nota } = request.body;
    
    try {
      // Validaciones básicas de entrada
      if (!id_estudiante || !nota) {
        return response.status(400).json({ 
          message: "ID de estudiante y nota son requeridos" 
        });
      }

      if (typeof nota !== 'string' || nota.trim().length === 0) {
        return response.status(400).json({ 
          message: "La nota debe ser un texto válido" 
        });
      }

      if (nota.length > 1000) {
        return response.status(400).json({ 
          message: "La nota no puede exceder 1000 caracteres" 
        });
      }

      const nuevaNota: Omit<Notes, "id_nota"> = {
        id_estudiante: parseInt(id_estudiante),
        nota: nota.trim(),
        fecha_creacion: new Date()
      };

      const notaId = await this.app.createNota(nuevaNota);
      return response
        .status(201)
        .json({ message: "Nota creada correctamente", notaId });
    } catch (error) {
      console.error("Error creating nota:", error);
      return response.status(500).json({ message: "Error en servidor" });
    }
  }

  async getAllNotas(request: Request, response: Response): Promise<Response> {
    try {
      const notas = await this.app.getAllNotas();
      return response.status(200).json(notas);
    } catch (error) {
      console.error("Error getting all notas:", error);
      return response.status(500).json({ message: "Error en servidor" });
    }
  }

  async getNotaById(request: Request, response: Response): Promise<Response> {
    try {
      const id = parseInt(request.params.id);
      if (isNaN(id)) {
        return response.status(400).json({ message: "ID inválido" });
      }
      
      const nota = await this.app.getNotaById(id);
      if (!nota) {
        return response.status(404).json({ message: "Nota no encontrada" });
      }
      
      return response.status(200).json(nota);
    } catch (error) {
      console.error("Error getting nota by ID:", error);
      return response.status(500).json({ message: "Error en servidor" });
    }
  }

  async getNotasByStudentId(request: Request, response: Response): Promise<Response> {
    try {
      const studentId = parseInt(request.params.studentId);
      if (isNaN(studentId)) {
        return response.status(400).json({ message: "ID de estudiante inválido" });
      }
      
      const notas = await this.app.getNotasByStudentId(studentId);
      return response.status(200).json(notas);
    } catch (error) {
      console.error("Error getting notas by student ID:", error);
      return response.status(500).json({ message: "Error en servidor" });
    }
  }

  async updateNota(request: Request, response: Response): Promise<Response> {
    try {
      const id = parseInt(request.params.id);
      if (isNaN(id)) {
        return response.status(400).json({ message: "ID inválido" });
      }

      const { nota } = request.body;

      if (!nota) {
        return response.status(400).json({ message: "Nota es requerida" });
      }

      if (typeof nota !== 'string' || nota.trim().length === 0) {
        return response.status(400).json({ 
          message: "La nota debe ser un texto válido" 
        });
      }

      if (nota.length > 1000) {
        return response.status(400).json({ 
          message: "La nota no puede exceder 1000 caracteres" 
        });
      }

      const updated = await this.app.updateNota(id, { nota: nota.trim() });
      if (!updated) {
        return response
          .status(404)
          .json({ message: "Nota no encontrada o no actualizada" });
      }
      
      return response.status(200).json({ message: "Nota actualizada con éxito" });
    } catch (error) {
      console.error("Error updating nota:", error);
      return response.status(500).json({ message: "Error en servidor" });
    }
  }

  async deleteNota(request: Request, response: Response): Promise<Response> {
    const id = parseInt(request.params.id);

    if (isNaN(id)) {
      return response.status(400).json({ message: "ID no válido" });
    }

    try {
      const existingNota = await this.app.getNotaById(id);
      if (!existingNota) {
        return response.status(404).json({ message: "Nota no encontrada" });
      }

      const deleted = await this.app.deleteNota(id);

      if (!deleted) {
        return response
          .status(500)
          .json({ message: "No se pudo eliminar la nota" });
      }

      return response.status(200).json({ message: "Nota eliminada correctamente" });
    } catch (error) {
      console.error("Error deleting nota:", error);
      return response.status(500).json({ message: "Error en servidor" });
    }
  }
}