import { CreateNotificationDTO, UpdateNotificationDTO } from "./NotificationDTO";

describe("NotificationDTO", () => {
  it("CreateNotificationDTO debe asignar propiedades correctamente", () => {
    const dto: CreateNotificationDTO = {
      idEstudiante: 10,
      idProfesional: 5,
      mensaje: "Tienes una nueva cita programada",
    };

    expect(dto.idEstudiante).toBe(10);
    expect(dto.idProfesional).toBe(5);
    expect(dto.mensaje).toBe("Tienes una nueva cita programada");
  });

  it("CreateNotificationDTO debe permitir idProfesional como null", () => {
    const dto: CreateNotificationDTO = {
      idEstudiante: 7,
      idProfesional: null,
      mensaje: "Recordatorio de encuesta pendiente",
    };

    expect(dto.idEstudiante).toBe(7);
    expect(dto.idProfesional).toBeNull();
    expect(dto.mensaje).toBe("Recordatorio de encuesta pendiente");
  });

  it("UpdateNotificationDTO debe permitir propiedades opcionales", () => {
    const dto: UpdateNotificationDTO = {
      leido: true,
    };

    expect(dto.leido).toBe(true);
    expect(dto.mensaje).toBeUndefined();
  });
});
