import { StudentApplicationService } from "./StudentApplicationService";
import bcrypt from "bcryptjs";
import { AuthApplication } from "./AuthApplication";

// Mock manual
jest.mock("bcryptjs");

describe("StudentApplicationService", () => {
  // Mock del port (StudentsPorts)
  const mockPort = {
    getStudentByEmail: jest.fn(),
    createStudent: jest.fn(),
    getStudentById: jest.fn(),
    updateStudent: jest.fn(),
    deleteStudent: jest.fn(),
    getAllStudents: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("createStudent: debe hashear la contraseña y llamar a port.createStudent cuando no existe el usuario", async () => {
    // Arrange
    const service = new StudentApplicationService(mockPort as any);
    const newUser = {
      name: "Alice",
      mail: "alice@example.com",
      password: "password123",
      status: true,
      lastName: "Smith",
      semester: 1,
      program: "Ing",
      date: new Date(),
    };

    // Simulamos que no existe usuario con ese email
    mockPort.getStudentByEmail.mockResolvedValueOnce(null);
    // Simulamos que bcrypt.hash devuelve "hashedPassword"
    (bcrypt.hash as jest.Mock).mockResolvedValueOnce("hashedPassword");
    // Simulamos que createStudent retorna el id 42
    mockPort.createStudent.mockResolvedValueOnce(42);

    // Act
    const result = await service.createStudent({ ...newUser });

    // Assert
    expect(mockPort.getStudentByEmail).toHaveBeenCalledWith(newUser.mail);
    expect(bcrypt.hash).toHaveBeenCalledWith(newUser.password, 10);
    // Se espera que createStudent haya sido llamado con la contraseña hasheada
    expect(mockPort.createStudent).toHaveBeenCalledWith(expect.objectContaining({
      ...newUser,
      password: "hashedPassword",
    }));
    expect(result).toBe(42);
  });

  it("createStudent: si el usuario ya existe debe lanzar 'Usuario ya existe'", async () => {
    const service = new StudentApplicationService(mockPort as any);
    const user = {
      name: "Bob",
      mail: "bob@example.com",
      password: "pass",
      status: true,
      lastName: "X",
      semester: 1,
      program: "Ing",
      date: new Date(),
    };

    // Simulamos que ya existe un usuario con ese email
    mockPort.getStudentByEmail.mockResolvedValueOnce({ id: 1, mail: user.mail, password: "x" });

    await expect(service.createStudent(user)).rejects.toThrow("Usuario ya existe");
    expect(mockPort.createStudent).not.toHaveBeenCalled();
  });

  it("login: cuando credenciales válidas debe devolver token y user", async () => {
    const service = new StudentApplicationService(mockPort as any);
    const email = "carol@example.com";
    const plainPassword = "mypassword";
    const hashedPassword = "hashedpwd";

    const existingUser = {
      id: 5,
      mail: email,
      password: hashedPassword,
      name: "Carol",
      program: "Ing Software",
      semester: 7,
    };

    mockPort.getStudentByEmail.mockResolvedValueOnce(existingUser);
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);

    // Mockeamos AuthApplication.generateToken
    const spyGen = jest.spyOn(AuthApplication, "generateToken").mockReturnValueOnce("token-xyz");

    const result = await service.login(email, plainPassword);

    expect(mockPort.getStudentByEmail).toHaveBeenCalledWith(email);
    expect(bcrypt.compare).toHaveBeenCalledWith(plainPassword, hashedPassword);
    expect(spyGen).toHaveBeenCalledWith(expect.objectContaining({ id: existingUser.id, email: existingUser.mail }));
    expect(result).toEqual({ token: "token-xyz", user: existingUser });

    spyGen.mockRestore();
  });

  it("login: si usuario no existe o contraseña es inválida debe lanzar 'Credentials are Invalid'", async () => {
    const service = new StudentApplicationService(mockPort as any);
    const email = "noone@example.com";
    const password = "x";

    // user no existe
    mockPort.getStudentByEmail.mockResolvedValueOnce(null);
    await expect(service.login(email, password)).rejects.toThrow("Credentials are Invalid");

    // user existe pero bcrypt.compare devuelve false
    const existingUser = { id: 9, mail: email, password: "hash" };
    mockPort.getStudentByEmail.mockResolvedValueOnce(existingUser);
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);
    await expect(service.login(email, password)).rejects.toThrow("Credentials are Invalid");
  });
});
