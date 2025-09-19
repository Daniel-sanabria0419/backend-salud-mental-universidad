import { Students } from "./Students";

describe("Students Domain Model", () => {
  it("debe crear un objeto Students válido", () => {
    const student: Students = {
      id: 1,
      name: "Laura",
      lastName: "Martinez",
      mail: "laura@example.com",
      password: "hashed123",
      semester: 5,
      program: "Ingeniería",
      date: new Date(),
      status: true,
    };

    expect(student).toHaveProperty("id", 1);
    expect(student.mail).toMatch(/@/);
    expect(student.date).toBeInstanceOf(Date);
    expect(student.status).toBe(true);
  });

  it("no debería permitir propiedades faltantes (tipado TypeScript)", () => {
    // @ts-expect-error falta 'mail'
    const invalidStudent: Students = {
      id: 2,
      name: "Carlos",
      lastName: "Perez",
      password: "1234",
      semester: 1,
      program: "Psicología",
      date: new Date(),
      status: false,
    };
    expect(invalidStudent).toBeDefined();
  });
});
