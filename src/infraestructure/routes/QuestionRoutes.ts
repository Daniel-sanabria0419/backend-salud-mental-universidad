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

<<<<<<< HEAD
=======

router.get("/questionsBySurveyId/:id", authenticateToken, async (req, res) => {
  await questionController.questionsBySurveyId(req, res);
});

>>>>>>> 2b14ab01396e9883608d676b6e1ff018bea2a53f
router.put("/questions/:id", authenticateToken, async (req, res) => {
  await questionController.updateQuestion(req, res);
});

router.delete("/questions/:id", authenticateToken, async (req, res) => {
  await questionController.deleteQuestion(req, res);
});

export default router;