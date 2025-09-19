import { Survey } from "./Survey";

describe("Survey Domain Model", () => {
  it("debe crear un objeto Survey válido", () => {
    const survey: Survey = {
      id: 1,
      titulo: "Encuesta de Satisfacción",
      descripcion: "Queremos conocer tu opinión",
      fecha_creacion: new Date(),
      estado: true,
    };

    expect(survey.id).toBe(1);
    expect(survey.titulo).toBe("Encuesta de Satisfacción");
    expect(survey.descripcion).toContain("opinión");
    expect(survey.fecha_creacion).toBeInstanceOf(Date);
    expect(typeof survey.estado).toBe("boolean");
  });

  it("no debería permitir propiedades faltantes (tipado TypeScript)", () => {
    // @ts-expect-error: falta el campo requerido 'titulo'
    const invalidSurvey: Survey = {
      id: 2,
      fecha_creacion: new Date(),
      estado: false,
    };
  });
});
