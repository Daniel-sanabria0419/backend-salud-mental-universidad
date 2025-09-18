import { Router } from "express";
import { ProfessionalAdapter } from "../adapter/ProfessionalAdapter";
import { ProfessionalApplicationService } from "../../application/ProfessionalApplicationService";
import { ProfessionalController } from "../controller/ProfessionalController";
import { authenticateToken } from "../web/authMiddleware";

const router = Router();

// Inicialización de capas
const professionalAdapter = new ProfessionalAdapter();
const professionalApp = new ProfessionalApplicationService(professionalAdapter);
const professionalController = new ProfessionalController(professionalApp);

// Endpoints
router.post("/professionals", authenticateToken, async (req, res) => {
  await professionalController.registerProfessional(req, res);
});

router.get("/professionals", authenticateToken, async (req, res) => {
  await professionalController.getAllProfessionals(req, res);
});

router.get("/professionals/:id", authenticateToken, async (req, res) => {
  await professionalController.getProfessionalById(req, res);
});

router.put("/professionals/:id", authenticateToken, async (req, res) => {
  await professionalController.updateProfessional(req, res);
});

router.delete("/professionals/:id", authenticateToken, async (req, res) => {
  await professionalController.deleteProfessional(req, res);
});

// Registro (sin token porque es público)
router.post("/professionals/register", async (req, res) => {
  await professionalController.registerProfessional(req, res);
});

// Login (sin token porque es público)
router.post("/professionals/login", async (req, res) => {
  await professionalController.login(req, res);
});

export default router;