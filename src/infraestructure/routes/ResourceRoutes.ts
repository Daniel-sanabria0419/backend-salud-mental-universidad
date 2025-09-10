import { Router } from "express";
import { ResourceAdapter } from "../adapter/ResourceAdapter";
import { ResourceApplicationService } from "../../application/ResourceApplicationService";
import { ResourceController } from "../controller/ResourceController";
import { authenticateToken } from "../web/authMiddleware";

const router = Router();

// inicialización de capas -> Adapter, Application, Controller
const resourceAdapter = new ResourceAdapter();
const resourceApp = new ResourceApplicationService(resourceAdapter);
const resourceController = new ResourceController(resourceApp);

// Crear recurso
router.post("/resources", authenticateToken, async (request, response) => {
  try {
    await resourceController.create(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al crear recurso" });
  }
});

// Obtener todos los recursos
router.get("/resources", authenticateToken, async (request, response) => {
  try {
    await resourceController.getAll(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al obtener recursos" });
  }
});

// Obtener recurso por ID
router.get("/resources/:id", authenticateToken, async (request, response) => {
  try {
    await resourceController.getById(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al obtener recurso por ID" });
  }
});

// Actualizar recurso
router.put("/resources/:id", authenticateToken, async (request, response) => {
  try {
    await resourceController.update(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al actualizar recurso" });
  }
});

// Eliminar recurso
router.delete("/resources/:id", authenticateToken, async (request, response) => {
  try {
    await resourceController.delete(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al eliminar recurso" });
  }
});

export default router;