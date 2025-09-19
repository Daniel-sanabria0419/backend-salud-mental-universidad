import { SurveyRepository } from "./SurveyPorts";
import { Survey } from "./Survey";

// Mock del repositorio
const mockSurveyRepo: SurveyRepository = {
  create: jest.fn(async (data) => ({
    id: 1,
    ...data,
    fecha_creacion: new Date(),
    estado: true,
  })),
  findAll: jest.fn(async () => [
    { id: 1, titulo: "Encuesta 1", fecha_creacion: new Date(), estado: true },
    { id: 2, titulo: "Encuesta 2", fecha_creacion: new Date(), estado: false },
  ]),
  findById: jest.fn(async (id) =>
    id === 1
      ? { id: 1, titulo: "Encuesta 1", fecha_creacion: new Date(), estado: true }
      : null
  ),
  update: jest.fn(async (id, data) =>
  id === 1
    ? {
        id,
        titulo: data.titulo ?? "Titulo por defecto",
        descripcion: data.descripcion,
        fecha_creacion: new Date(),
        estado: true,
      }
    : null
),

  delete: jest.fn(async (id) => id === 1),
};

describe("SurveyRepository Contract", () => {
  it("create debe devolver un Survey", async () => {
    const result = await mockSurveyRepo.create({ titulo: "Nueva", descripcion: "desc" });
    expect(result).toHaveProperty("id");
    expect(result.titulo).toBe("Nueva");
    expect(result.fecha_creacion).toBeInstanceOf(Date);
  });

  it("findAll debe devolver un array de Surveys", async () => {
    const result = await mockSurveyRepo.findAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty("titulo");
  });

  it("findById debe devolver un Survey si existe, o null si no", async () => {
    const found = await mockSurveyRepo.findById(1);
    expect(found?.id).toBe(1);

    const notFound = await mockSurveyRepo.findById(99);
    expect(notFound).toBeNull();
  });

  it("update debe devolver el Survey actualizado o null", async () => {
    const updated = await mockSurveyRepo.update(1, { titulo: "Actualizado" });
    expect(updated?.titulo).toBe("Actualizado");

    const notUpdated = await mockSurveyRepo.update(99, { titulo: "Nada" });
    expect(notUpdated).toBeNull();
  });

  it("delete debe devolver true si lo borra, false si no", async () => {
    const deleted = await mockSurveyRepo.delete(1);
    expect(deleted).toBe(true);

    const notDeleted = await mockSurveyRepo.delete(99);
    expect(notDeleted).toBe(false);
  });
});
