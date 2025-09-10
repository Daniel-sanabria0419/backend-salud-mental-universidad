import { Router } from "express";
import { NotificationAdapter } from "../adapter/NotificationAdapter";
import { NotificationApplicationService } from "../../application/NotificationApplicationService";
import { NotificationController } from "../controller/NotificationController";
import { authenticateToken } from "../web/authMiddleware";

const router = Router();

// inicialización de capas -> Adapter, Application, Controller
const notificationAdapter = new NotificationAdapter();
const notificationApp = new NotificationApplicationService(notificationAdapter);
const notificationController = new NotificationController(notificationApp);

// Crear notificación
router.post("/notifications", authenticateToken, async (request, response) => {
  try {
    await notificationController.createNotification(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al crear notificación" });
  }
});

// Obtener todas las notificaciones
router.get("/notifications", authenticateToken, async (request, response) => {
  try {
    await notificationController.getAllNotifications(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al obtener notificaciones" });
  }
});

// Obtener notificación por ID
router.get("/notifications/:id", authenticateToken, async (request, response) => {
  try {
    await notificationController.getNotificationById(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al obtener notificación" });
  }
});

// Actualizar notificación
router.put("/notifications/:id", authenticateToken, async (request, response) => {
  try {
    await notificationController.updateNotification(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al actualizar notificación" });
  }
});

// Eliminar (o dar de baja) notificación
router.delete("/notifications/:id", authenticateToken, async (request, response) => {
  try {
    await notificationController.deleteNotification(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al eliminar notificación" });
  }
});

export default router;