import { Router } from "express";
import { SurveyAdapter } from "../adapter/SurveyAdapter";
import { SurveyApplicationService } from "../../application/SurveyApplicationService";
import { SurveyController } from "../controller/SurveyController";
import { authenticateToken } from "../web/authMiddleware";

const router = Router();

// Inicialización de capas
const surveyAdapter = new SurveyAdapter();
const surveyApp = new SurveyApplicationService(surveyAdapter);
const surveyController = new SurveyController(surveyApp);

// Endpoints
router.post("/surveys", authenticateToken, async (req, res) => {
  await surveyController.createSurvey(req, res);
});

router.get("/surveys", authenticateToken, async (req, res) => {
  await surveyController.getAllSurveys(req, res);
});

router.get("/surveys/:id", authenticateToken, async (req, res) => {
  await surveyController.getSurveyById(req, res);
});

router.put("/surveys/:id", authenticateToken, async (req, res) => {
  await surveyController.updateSurvey(req, res);
});

router.delete("/surveys/:id", authenticateToken, async (req, res) => {
  await surveyController.deleteSurvey(req, res);
});

export default router;