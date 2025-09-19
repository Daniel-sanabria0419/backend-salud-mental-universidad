import express from "express";
import cors from "cors";

import userRoutes from "../routes/UserRoutes";
import resourceRoutes from "../routes/ResourceRoutes";
import notificationRoutes from "../routes/NotificationRoutes";
import surveyRoutes from "../routes/SurveyRoutes";
import questionRoutes from "../routes/QuestionRoutes";
import answerRoutes from "../routes/AnswerRoutes";
import professionalRoutes from "../routes/ProfessionalRoutes";

class App {
  private app: express.Application;
 
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }
 
  private routes(): void {
    this.app.use("/api", userRoutes);
    this.app.use("/api", resourceRoutes);
    this.app.use("/api", notificationRoutes);
    this.app.use("/api", surveyRoutes);
    this.app.use("/api", questionRoutes);
    this.app.use("/api", answerRoutes);
    this.app.use("/api", professionalRoutes);
  }
 
  getApp(): express.Application {
    return this.app;
  }
}

export default new App().getApp();
