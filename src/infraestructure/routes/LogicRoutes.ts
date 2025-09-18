import { Router } from 'express';
import { LogicController } from '../controller/logicController';
import { authenticateToken } from "../web/authMiddleware";

import { LogicApplicationService } from '../../application/logicApplicationService';
import { AnswerAdapter } from '../adapter/AnswerAdapter';
import { OptionAnswerAdapter } from '../adapter/OptionAnswerAdapter';

import { SurveyAdapter } from '../adapter/SurveyAdapter';
import { QuestionAdapter } from '../adapter/QuestionAdapter';

const router = Router();

// Instanciar repositorios
const surveyRepository = new SurveyAdapter();
const questionRepository = new QuestionAdapter();
const answerRepository = new AnswerAdapter();

const optionAnswerRepository = new OptionAnswerAdapter();

// Instanciar el servicio de aplicación
const logicApplicationService = new LogicApplicationService(answerRepository,optionAnswerRepository,surveyRepository, questionRepository );

// Instanciar el controlador
const logicController = new LogicController(logicApplicationService);

// Definir las rutas para la lógica de negocio
router.get("/getPuntajesDashboard/:studentId", authenticateToken, async (request, response) => {
  try {
    await logicController.getPuntajesDashboard(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al obtener usuarios" });
  }
});
// Agregar más rutas según necesites
// router.post('/another-logic-endpoint', logicController.anotherMethod.bind(logicController));

export default router;
