import { Professional } from "./Professional";

describe("Professional Domain Model", () => {
  it("debe crear un objeto Professional válido", () => {
    const professional: Professional = {
      id_profesional: 1,
      nombre: "Ana",
      apellido: "Lopez",
      correo: "ana@example.com",
      contrasena: "hashedpwd",
      fecha_registro: new Date(),
    };

    expect(professional).toHaveProperty("id_profesional", 1);
    expect(professional).toHaveProperty("nombre", "Ana");
    expect(professional).toHaveProperty("correo", "ana@example.com");
    expect(professional.fecha_registro).toBeInstanceOf(Date);
  });

  it("no debería permitir propiedades faltantes (tipado TypeScript)", () => {
    // @ts-expect-error falta 'correo'
    const invalidProfessional: Professional = {
      id_profesional: 2,
      nombre: "Pedro",
      apellido: "Martinez",
      contrasena: "123",
      fecha_registro: new Date(),
    };
    expect(invalidProfessional).toBeDefined();
  });
});
