import { Router } from "express";
import { NotasAdapter } from "../adapter/NotesAdapter";
import { NotesApplicationService } from "../../application/NotesApplicationService";
import { NotasController } from "../controller/NotesController";
import { authenticateToken } from "../web/authMiddleware";

const router = Router();

// inicialización de capas -> Adapter, Application, Controller
const notasAdapter = new NotasAdapter();
const notasApp = new NotesApplicationService(notasAdapter);
const notasController = new NotasController(notasApp);

// Crear nota
router.post("/notas", authenticateToken, async (request, response) => {
  try {
    await notasController.createNota(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al crear nota" });
  }
});

// Obtener todas las notas
router.get("/notas", authenticateToken, async (request, response) => {
  try {
    await notasController.getAllNotas(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al obtener notas" });
  }
});

// Obtener nota por ID
router.get("/notas/:id", authenticateToken, async (request, response) => {
  try {
    await notasController.getNotaById(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al obtener nota" });
  }
});

// Obtener notas por ID de estudiante
router.get("/notas/student/:studentId", authenticateToken, async (request, response) => {
  try {
    await notasController.getNotasByStudentId(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al obtener notas del estudiante" });
  }
});

// Actualizar nota
router.put("/notas/:id", authenticateToken, async (request, response) => {
  try {
    await notasController.updateNota(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al actualizar nota" });
  }
});

// Eliminar nota
router.delete("/notas/:id", authenticateToken, async (request, response) => {
  try {
    await notasController.deleteNota(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al eliminar nota" });
  }
});

export default router;