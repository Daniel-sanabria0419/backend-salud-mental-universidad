import { Router } from "express";
import { AnswerAdapter } from "../adapter/AnswerAdapter";
import { AnswerApplicationService } from "../../application/AnswerApplicationService";
import { AnswerController } from "../controller/AnswerController";
import { authenticateToken } from "../web/authMiddleware";

const router = Router();

// Inicialización de capas
const answerAdapter = new AnswerAdapter();
const answerApp = new AnswerApplicationService(answerAdapter);
const answerController = new AnswerController(answerApp);

// Endpoints
router.post("/answers", authenticateToken, async (req, res) => {
  await answerController.createAnswer(req, res);
});

router.get("/answers", authenticateToken, async (req, res) => {
  await answerController.getAllAnswers(req, res);
});

router.get("/answers/:id", authenticateToken, async (req, res) => {
  await answerController.getAnswerById(req, res);
});


router.get("/answersByStudent/:id", authenticateToken, async (req, res) => {
  await answerController.getAnswerByStudent(req, res);
});

router.put("/answers/:id", authenticateToken, async (req, res) => {
  await answerController.updateAnswer(req, res);
});

router.delete("/answers/:id", authenticateToken, async (req, res) => {
  await answerController.deleteAnswer(req, res);
});

export default router;