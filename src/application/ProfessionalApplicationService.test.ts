import { ProfessionalApplicationService } from "./ProfessionalApplicationService";
import bcrypt from "bcryptjs";
import { AuthApplication } from "./AuthApplication";

// Mock manual de bcrypt
jest.mock("bcryptjs");

describe("ProfessionalApplicationService", () => {
  // Mock del port (ProfessionalPorts)
  const mockPort = {
    getProfessionalByEmail: jest.fn(),
    createProfessional: jest.fn(),
    getProfessionalById: jest.fn(),
    updateProfessional: jest.fn(),
    deleteProfessional: jest.fn(),
    getAllProfessionals: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("createProfessional: debe hashear la contraseña y llamar a port.createProfessional cuando no existe el profesional", async () => {
    const service = new ProfessionalApplicationService(mockPort as any);
    const newProf = {
      nombre: "Juan",
      apellido: "Perez",
      correo: "juan@mail.com",
      contrasena: "password123",
      fecha_registro: new Date(),
    };

    // Simulamos que no existe profesional con ese correo
    mockPort.getProfessionalByEmail.mockResolvedValueOnce(null);
    // bcrypt.hash devuelve un hash simulado
    (bcrypt.hash as jest.Mock).mockResolvedValueOnce("hashedPwd");
    // Simulamos que createProfessional retorna el id 10
    mockPort.createProfessional.mockResolvedValueOnce(10);

    const result = await service.createProfessional({ ...newProf });

    expect(mockPort.getProfessionalByEmail).toHaveBeenCalledWith(newProf.correo);
    expect(bcrypt.hash).toHaveBeenCalledWith(newProf.contrasena, 10);
    expect(mockPort.createProfessional).toHaveBeenCalledWith(
      expect.objectContaining({
        ...newProf,
        contrasena: "hashedPwd",
      })
    );
    expect(result).toBe(10);
  });

  it("createProfessional: si ya existe debe lanzar 'El profesional ya existe'", async () => {
    const service = new ProfessionalApplicationService(mockPort as any);
    const prof = {
      nombre: "Ana",
      apellido: "Lopez",
      correo: "ana@mail.com",
      contrasena: "pwd",
      fecha_registro: new Date(),
    };

    mockPort.getProfessionalByEmail.mockResolvedValueOnce({ id_profesional: 1, correo: prof.correo });

    await expect(service.createProfessional(prof)).rejects.toThrow("El profesional ya existe");
    expect(mockPort.createProfessional).not.toHaveBeenCalled();
  });

  it("login: cuando credenciales válidas debe devolver token y user", async () => {
    const service = new ProfessionalApplicationService(mockPort as any);
    const correo = "pro@mail.com";
    const contrasena = "mypassword";
    const hashed = "hashedpwd";

    const existingProf = {
      id_profesional: 5,
      nombre: "Carlos",
      apellido: "Diaz",
      correo,
      contrasena: hashed,
    };

    mockPort.getProfessionalByEmail.mockResolvedValueOnce(existingProf);
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);

    const spyGen = jest.spyOn(AuthApplication, "generateToken").mockReturnValueOnce("token-abc");

    const result = await service.login(correo, contrasena);

    expect(mockPort.getProfessionalByEmail).toHaveBeenCalledWith(correo);
    expect(bcrypt.compare).toHaveBeenCalledWith(contrasena, hashed);
    expect(spyGen).toHaveBeenCalledWith(expect.objectContaining({ id_profesional: existingProf.id_profesional, correo }));
    expect(result).toEqual({ token: "token-abc", user: existingProf });

    spyGen.mockRestore();
  });

  it("login: si usuario no existe o contraseña inválida debe lanzar 'Credenciales inválidas'", async () => {
    const service = new ProfessionalApplicationService(mockPort as any);
    const correo = "no@mail.com";
    const pwd = "123";

    // se simula no existe
    mockPort.getProfessionalByEmail.mockResolvedValueOnce(null);
    await expect(service.login(correo, pwd)).rejects.toThrow("Credenciales inválidas");

    // se simula existe pero contraseña inválida
    const prof = { id_profesional: 2, correo, contrasena: "hash" };
    mockPort.getProfessionalByEmail.mockResolvedValueOnce(prof);
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);
    await expect(service.login(correo, pwd)).rejects.toThrow("Credenciales inválidas");
  });

  it("updateProfessional: debe actualizar cuando existe el profesional", async () => {
    const service = new ProfessionalApplicationService(mockPort as any);

    const existing = { id_profesional: 1, correo: "old@mail.com", contrasena: "hash" };
    mockPort.getProfessionalById.mockResolvedValueOnce(existing);

    mockPort.getProfessionalByEmail.mockResolvedValueOnce(null);
    (bcrypt.hash as jest.Mock).mockResolvedValueOnce("newHash");
    mockPort.updateProfessional.mockResolvedValueOnce(true);

    const result = await service.updateProfessional(1, { correo: "new@mail.com", contrasena: "newpwd" });

    expect(result).toBe(true);
    expect(mockPort.updateProfessional).toHaveBeenCalledWith(1, {
      correo: "new@mail.com",
      contrasena: "newHash",
    });
  });

  it("updateProfessional: debe lanzar 'Profesional no existe' si el id no existe", async () => {
    const service = new ProfessionalApplicationService(mockPort as any);
    mockPort.getProfessionalById.mockResolvedValueOnce(null);

    await expect(service.updateProfessional(1, { correo: "test@mail.com" })).rejects.toThrow("Profesional no existe");
  });

  it("updateProfessional: debe lanzar 'Correo ya en uso' si el correo ya pertenece a otro", async () => {
    const service = new ProfessionalApplicationService(mockPort as any);
    jest.clearAllMocks();

    const existing = { id_profesional: 1, correo: "old@mail.com" };
    mockPort.getProfessionalById.mockResolvedValueOnce(existing);

    mockPort.getProfessionalByEmail.mockResolvedValueOnce({ id_profesional: 2, correo: "nuevo@mail.com" });

    await expect(
      service.updateProfessional(1, { correo: "nuevo@mail.com" })
    ).rejects.toThrow("Correo ya en uso");
  });

  it("deleteProfessional: debe eliminar si existe el profesional", async () => {
    const service = new ProfessionalApplicationService(mockPort as any);
    const existing = { id_profesional: 1, correo: "del@mail.com" };

    mockPort.getProfessionalById.mockResolvedValueOnce(existing);
    mockPort.deleteProfessional.mockResolvedValueOnce(true);

    const result = await service.deleteProfessional(1);

    expect(result).toBe(true);
    expect(mockPort.deleteProfessional).toHaveBeenCalledWith(1);
  });

  it("deleteProfessional: debe lanzar 'Profesional no existe' si no se encuentra el id", async () => {
    const service = new ProfessionalApplicationService(mockPort as any);
    mockPort.getProfessionalById.mockResolvedValueOnce(null);

    await expect(service.deleteProfessional(1)).rejects.toThrow("Profesional no existe");
  });

  it("getProfessionalById: debe llamar al port y devolver el profesional", async () => {
    const service = new ProfessionalApplicationService(mockPort as any);
    const prof = { id_profesional: 1, correo: "test@mail.com" };

    mockPort.getProfessionalById.mockResolvedValueOnce(prof);

    const result = await service.getProfessionalById(1);
    expect(result).toEqual(prof);
  });

  it("getProfessionalByEmail: debe llamar al port y devolver el profesional", async () => {
    const service = new ProfessionalApplicationService(mockPort as any);
    jest.clearAllMocks();

    const prof = { id_profesional: 1, correo: "test@mail.com" };
    mockPort.getProfessionalByEmail.mockResolvedValueOnce(prof);

    const result = await service.getProfessionalByEmail("test@mail.com");
    expect(result).toEqual(prof);
  });

  it("getAllProfessionals: debe devolver lista de profesionales", async () => {
    const service = new ProfessionalApplicationService(mockPort as any);
    const profs = [
      { id_profesional: 1, correo: "a@mail.com" },
      { id_profesional: 2, correo: "b@mail.com" },
    ];

    mockPort.getAllProfessionals.mockResolvedValueOnce(profs);

    const result = await service.getAllProfessionals();
    expect(result).toEqual(profs);
  });
});
