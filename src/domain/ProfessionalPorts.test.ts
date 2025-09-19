import { ProfessionalPorts } from "./ProfessionalPorts";
import { Professional } from "./Professional";

// Un mock simple para simular implementación
const mockRepo: ProfessionalPorts = {
  createProfessional: jest.fn().mockResolvedValue(1),
  updateProfessional: jest.fn().mockResolvedValue(true),
  deleteProfessional: jest.fn().mockResolvedValue(true),
  getProfessionalById: jest.fn().mockResolvedValue({
    id_profesional: 1,
    nombre: "Ana",
    apellido: "Lopez",
    correo: "ana@example.com",
    contrasena: "hashed",
    fecha_registro: new Date(),
  }),
  getAllProfessionals: jest.fn().mockResolvedValue([]),
  getProfessionalByEmail: jest.fn().mockResolvedValue(null),
};

describe("ProfessionalPorts Contract", () => {
  it("createProfessional debe devolver un id (number)", async () => {
    const id = await mockRepo.createProfessional({
      nombre: "Ana",
      apellido: "Lopez",
      correo: "ana@example.com",
      contrasena: "pwd123",
    });
    expect(typeof id).toBe("number");
  });

  it("getProfessionalById debe devolver un Professional o null", async () => {
    const prof = await mockRepo.getProfessionalById(1);
    expect(prof).toHaveProperty("id_profesional", 1);
    expect(prof?.correo).toMatch(/@/);
  });
});
