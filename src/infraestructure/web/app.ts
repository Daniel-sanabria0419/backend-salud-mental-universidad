import express, { Response, Request } from "express";
import userRoutes from "../routes/UserRoutes";
import resourceRoutes from "../routes/ResourceRoutes";
import notificationRoutes from "../routes/NotificationRoutes";
import surveyRoutes from "../routes/SurveyRoutes";
import questionRoutes from "../routes/QuestionRoutes"
import answerRoutes from "../routes/AnswerRoutes"
import professionalRoutes from "../routes/ProfessionalRoutes"
import optionAnswerRoutes from "../routes/OptionAnswerRoutes"
import logicRoutes from "../routes/LogicRoutes"
import notesRoutes from "../routes/NotesRoutes"

import cors from "cors";

class App {
  private app!: express.Application;
 
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
    this.app.use("/api", optionAnswerRoutes);
    this.app.use("/api", notesRoutes);
    this.app.use("/api", logicRoutes);



  }
 
  getApp() {
    return this.app;
  }
}
 
export default new App().getApp();
 
 
