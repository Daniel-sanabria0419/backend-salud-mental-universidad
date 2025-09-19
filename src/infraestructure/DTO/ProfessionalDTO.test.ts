import { ProfessionalDTO } from "./ProfessionalDTO";

describe("ProfessionalDTO", () => {
  it("debe crear un ProfessionalDTO válido con todos los campos", () => {
    const dto = new ProfessionalDTO({
      id_profesional: 1,
      nombre: "Carlos",
      apellido: "Pérez",
      correo: "carlos@mail.com",
      contrasena: "123456",
      fecha_registro: new Date("2023-01-01"),
    });

    expect(dto.id_profesional).toBe(1);
    expect(dto.nombre).toBe("Carlos");
    expect(dto.apellido).toBe("Pérez");
    expect(dto.correo).toBe("carlos@mail.com");
    expect(dto.contrasena).toBe("123456");
    expect(dto.fecha_registro).toEqual(new Date("2023-01-01"));
  });

  it("debe permitir crear un DTO parcial y asignar propiedades dinámicamente", () => {
    const dto = new ProfessionalDTO({ nombre: "Ana", correo: "ana@mail.com", contrasena: "123" });

    expect(dto.nombre).toBe("Ana");
    expect(dto.apellido).toBeUndefined();
    expect(dto.correo).toBe("ana@mail.com");
  });
});
