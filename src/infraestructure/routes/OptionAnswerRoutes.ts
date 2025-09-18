import { Router } from "express";
import { OptionAnswerAdapter } from "../adapter/OptionAnswerAdapter";
import { OptionAnswerApplicationService } from "../../application/OptionAnswerApplicationService";
import { OptionAnswerController } from "../controller/OptionAnswerController";
import { authenticateToken } from "../web/authMiddleware";

const router = Router();

// Inicialización de capas
const optionAnswerAdapter = new OptionAnswerAdapter();
const optionAnswerApp = new OptionAnswerApplicationService(optionAnswerAdapter);
const optionAnswerController = new OptionAnswerController(optionAnswerApp);

// Endpoints CRUD
router.post("/option-answers", authenticateToken, async (req, res) => {
  await optionAnswerController.create(req, res);
});

router.get("/option-answers", authenticateToken, async (req, res) => {
  await optionAnswerController.findAll(req, res);
});

router.get("/option-answers/:id", authenticateToken, async (req, res) => {
  await optionAnswerController.findById(req, res);
});

router.put("/option-answers/:id", authenticateToken, async (req, res) => {
  await optionAnswerController.update(req, res);
});

router.delete("/option-answers/:id", authenticateToken, async (req, res) => {
  await optionAnswerController.delete(req, res);
});

// Endpoint extra: buscar por id_pregunta
router.get("/option-answers/by-question/:idQuestion", authenticateToken, async (req, res) => {
  await optionAnswerController.findByQuestionId(req, res);
});

export default router;