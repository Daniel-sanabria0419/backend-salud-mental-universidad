import { Survey } from "./Survey";
import { CreateSurveyDTO, UpdateSurveyDTO } from "../infraestructure/DTO/SurveyDTO";

export interface SurveyRepository {
  create(data: CreateSurveyDTO): Promise<Survey>;
  findAll(): Promise<Survey[]>;
  findById(id: number): Promise<Survey | null>;
  update(id: number, data: UpdateSurveyDTO): Promise<Survey | null>;
  delete(id: number): Promise<boolean>;
}