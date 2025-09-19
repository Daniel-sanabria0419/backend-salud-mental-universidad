import { Request, Response } from "express";
import { OptionAnswerApplicationService } from "../../application/OptionAnswerApplicationService";

export class OptionAnswerController {
  constructor(private service: OptionAnswerApplicationService) {}

  create = async (req: Request, res: Response) => {
    try {
      const option = await this.service.create(req.body);
      res.status(201).json(option);
    } catch (error) {
      res.status(400).json({ error: "Error creating option answer" });
    }
  };

  findAll = async (_: Request, res: Response) => {
    const options = await this.service.findAll();
    res.json(options);
  };

  findById = async (req: Request, res: Response) => {
    const option = await this.service.findById(Number(req.params.id));
    option ? res.json(option) : res.status(404).json({ error: "Not found" });
  };

  update = async (req: Request, res: Response) => {
    const option = await this.service.update(Number(req.params.id), req.body);
    option ? res.json(option) : res.status(404).json({ error: "Not found" });
  };

  delete = async (req: Request, res: Response) => {
    await this.service.delete(Number(req.params.id));
    res.status(204).send();
  };

 findByQuestionId = async (req: Request, res: Response) => {
  const questionId = Number(req.params.id);

  if (isNaN(questionId)) {
    return res.status(400).json({ error: "El id_pregunta debe ser un número válido" });
  }

  const options = await this.service.findByQuestionId(questionId);
  res.json(options);
};
}