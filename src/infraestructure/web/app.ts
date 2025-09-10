import express, { Response, Request } from "express";
import userRoutes from "../routes/UserRoutes";
import resourceRoutes from "../routes/ResourceRoutes";
import notificationRoutes from "../routes/NotificationRoutes";

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

  }
 
  getApp() {
    return this.app;
  }
}
 
export default new App().getApp();
 
 