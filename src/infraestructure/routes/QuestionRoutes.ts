import { Router } from "express";
import { QuestionAdapter } from "../adapter/QuestionAdapter";
import { QuestionApplicationService } from "../../application/QuestionApplicationService";
import { QuestionController } from "../controller/QuestionController";
import { authenticateToken } from "../web/authMiddleware";

const router = Router();

// Inicialización de capas
const questionAdapter = new QuestionAdapter();
const questionApp = new QuestionApplicationService(questionAdapter);
const questionController = new QuestionController(questionApp);

// Endpoints
router.post("/questions", authenticateToken, async (req, res) => {
  await questionController.createQuestion(req, res);
});

router.get("/questions", authenticateToken, async (req, res) => {
  await questionController.getAllQuestions(req, res);
});

router.get("/questions/:id", authenticateToken, async (req, res) => {
  await questionController.getQuestionById(req, res);
});

router.put("/questions/:id", authenticateToken, async (req, res) => {
  await questionController.updateQuestion(req, res);
});

router.delete("/questions/:id", authenticateToken, async (req, res) => {
  await questionController.deleteQuestion(req, res);
});

export default router;