import { CreateSurveyDTO, UpdateSurveyDTO } from "./SurveyDTO";

describe("SurveyDTO", () => {
  it("CreateSurveyDTO debe asignar propiedades correctamente", () => {
    // Arrange
    const dto: CreateSurveyDTO = {
      titulo: "Encuesta Bienestar",
      descripcion: "Sobre hábitos de estudio",
    };

    // Assert
    expect(dto.titulo).toBe("Encuesta Bienestar");
    expect(dto.descripcion).toBe("Sobre hábitos de estudio");
  });

  it("UpdateSurveyDTO debe permitir propiedades opcionales", () => {
    // Arrange
    const dto: UpdateSurveyDTO = {
      titulo: "Nuevo título",
    };

    // Assert
    expect(dto.titulo).toBe("Nuevo título");
    expect(dto.descripcion).toBeUndefined();
    expect(dto.estado).toBeUndefined();
  });
});
