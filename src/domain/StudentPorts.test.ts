import { StudentsPorts } from "./StudentPorts";
import { Students } from "./Students";

// Mock de StudentsPorts
const mockRepo: StudentsPorts = {
  createStudent: jest.fn().mockResolvedValue(10),
  updateStudent: jest.fn().mockResolvedValue(true),
  deleteStudent: jest.fn().mockResolvedValue(true),
  getStudentById: jest.fn().mockResolvedValue({
    id: 1,
    name: "Laura",
    lastName: "Martinez",
    mail: "laura@example.com",
    password: "hashed123",
    semester: 5,
    program: "Ingeniería",
    date: new Date(),
    status: true,
  }),
  getAllStudents: jest.fn().mockResolvedValue([]),
  getStudentByEmail: jest.fn().mockResolvedValue(null),
};

describe("StudentsPorts Contract", () => {
  it("createStudent debe devolver un id (number)", async () => {
    const id = await mockRepo.createStudent({
      name: "Laura",
      lastName: "Martinez",
      mail: "laura@example.com",
      password: "1234",
      semester: 5,
      program: "Ingeniería",
      date: new Date(),
      status: true,
    });
    expect(typeof id).toBe("number");
  });

  it("getStudentById debe devolver un Students o null", async () => {
    const student = await mockRepo.getStudentById(1);
    expect(student).toHaveProperty("id", 1);
    expect(student?.mail).toMatch(/@/);
    expect(student?.program).toBe("Ingeniería");
  });
});
