// src/application/SurveyApplicationService.test.ts
import { SurveyApplicationService } from "./SurveyApplicationService";
import { CreateSurveyDTO, UpdateSurveyDTO } from "../infraestructure/DTO/SurveyDTO";

describe("SurveyApplicationService", () => {
  // Mock del port (SurveyRepository)
  const mockRepo = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("create: debe llamar a repo.create con los datos correctos", async () => {
    // Arrange
    const service = new SurveyApplicationService(mockRepo as any);
    const dto: CreateSurveyDTO = {
      titulo: "Encuesta Salud Mental",
      descripcion: "Sobre estrés académico",
    };

    // Simulamos que el repo retorna la encuesta creada
    mockRepo.create.mockResolvedValueOnce({ id: 1, ...dto });

    // Act
    const result = await service.create(dto);

    // Assert
    expect(mockRepo.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ id: 1, ...dto });
  });

  it("findAll: debe devolver todas las encuestas", async () => {
    // Arrange
    const service = new SurveyApplicationService(mockRepo as any);
    const surveys = [
      { id: 1, titulo: "Encuesta 1" },
      { id: 2, titulo: "Encuesta 2" },
    ];

    mockRepo.findAll.mockResolvedValueOnce(surveys);

    // Act
    const result = await service.findAll();

    // Assert
    expect(mockRepo.findAll).toHaveBeenCalled();
    expect(result).toEqual(surveys);
  });

  it("findById: debe devolver la encuesta si existe", async () => {
    // Arrange
    const service = new SurveyApplicationService(mockRepo as any);
    const survey = { id: 5, titulo: "Encuesta X", descripcion: "detalle" };

    mockRepo.findById.mockResolvedValueOnce(survey);

    // Act
    const result = await service.findById(5);

    // Assert
    expect(mockRepo.findById).toHaveBeenCalledWith(5);
    expect(result).toEqual(survey);
  });

  it("update: debe llamar a repo.update con id y data", async () => {
    // Arrange
    const service = new SurveyApplicationService(mockRepo as any);
    const dto: UpdateSurveyDTO = {
      titulo: "Encuesta Actualizada",
      descripcion: "Se actualizó",
    };

    mockRepo.update.mockResolvedValueOnce({ id: 10, ...dto });

    // Act
    const result = await service.update(10, dto);

    // Assert
    expect(mockRepo.update).toHaveBeenCalledWith(10, dto);
    expect(result).toEqual({ id: 10, ...dto });
  });

  it("delete: debe llamar a repo.delete con el id", async () => {
    // Arrange
    const service = new SurveyApplicationService(mockRepo as any);

    mockRepo.delete.mockResolvedValueOnce(true);

    // Act
    const result = await service.delete(7);

    // Assert
    expect(mockRepo.delete).toHaveBeenCalledWith(7);
    expect(result).toBe(true);
  });
});
