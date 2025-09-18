import { ProfessionalApplicationService } from "../../application/ProfessionalApplicationService";
import { Request, Response } from "express";
import { Professional } from "../../domain/Professional";

export class ProfessionalController {
  private app: ProfessionalApplicationService;

  constructor(app: ProfessionalApplicationService) {
    this.app = app;
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { correo, contrasena } = req.body;
      if (!correo || !contrasena)
        return res.status(400).json({ error: "Correo y contraseña son requeridos" });

      if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(correo))
        return res.status(400).json({ error: "Correo electrónico no válido" });

      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,25}$/.test(contrasena))
        return res.status(400).json({
          error:
            "La contraseña debe tener entre 6 y 25 caracteres, con al menos una letra y un número",
        });

      const { token, user } = await this.app.login(correo, contrasena);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000, // 1 hora
      });

      return res.status(200).json({
        id_profesional: user.id_profesional,
        correo: user.correo,
        nombre: user.nombre,
        apellido: user.apellido,
        token: token,
      });
    } catch (error) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
  }

  async registerProfessional(req: Request, res: Response): Promise<Response> {
    const { nombre, apellido, correo, contrasena } = req.body;
    try {
      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre.trim()))
        return res.status(400).json({ message: "Nombre inválido" });

      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(apellido.trim()))
        return res.status(400).json({ message: "Apellido inválido" });

      if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(correo))
        return res.status(400).json({ error: "Correo electrónico no válido" });

      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,25}$/.test(contrasena))
        return res.status(400).json({
          error:
            "La contraseña debe tener entre 6 y 25 caracteres, con al menos una letra y un número",
        });

      const professional: Omit<Professional, "id_profesional"> = {
        nombre,
        apellido,
        correo,
        contrasena,
        fecha_registro: new Date(),
      };

      const professionalId = await this.app.createProfessional(professional);
      return res.status(201).json({
        message: "Profesional registrado correctamente",
        professionalId,
      });
    } catch (error) {
      return res.status(500).json({ message: "Error en servidor" });
    }
  }

  async getAllProfessionals(req: Request, res: Response): Promise<Response> {
    try {
      const professionals = await this.app.getAllProfessionals();
      return res.status(200).json(professionals);
    } catch (error) {
      return res.status(500).json({ message: "Error en servidor" });
    }
  }

  async getProfessionalById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

      const professional = await this.app.getProfessionalById(id);
      if (!professional)
        return res.status(404).json({ message: "Profesional no encontrado" });

      return res.status(200).json(professional);
    } catch (error) {
      return res.status(500).json({ message: "Error en servidor" });
    }
  }

  async updateProfessional(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "ID inválido" });

      const { nombre, apellido, correo, contrasena } = req.body;

      if (nombre && !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre.trim()))
        return res.status(400).json({ message: "Nombre inválido" });

      if (apellido && !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(apellido.trim()))
        return res.status(400).json({ message: "Apellido inválido" });

      if (correo && !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(correo.trim()))
        return res.status(400).json({ error: "Correo electrónico no válido" });

      if (contrasena && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,25}$/.test(contrasena.trim()))
        return res.status(400).json({
          message:
            "La contraseña debe tener entre 6 y 25 caracteres, con al menos una letra y un número",
        });

      const updated = await this.app.updateProfessional(id, {
        nombre,
        apellido,
        correo,
        contrasena,
      });

      if (!updated)
        return res
          .status(404)
          .json({ message: "Profesional no encontrado o no actualizado" });

      return res.status(200).json({ message: "Profesional actualizado con éxito" });
    } catch (error) {
      return res.status(500).json({ message: "Error en servidor" });
    }
  }

  async getProfessionalByEmail(req: Request, res: Response): Promise<Response> {
    const correo = req.params.correo;
    if (!correo || !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(correo))
      return res.status(400).json({ message: "Correo electrónico no válido" });

    try {
      const professional = await this.app.getProfessionalByEmail(correo);
      if (!professional)
        return res.status(404).json({ message: "Profesional no encontrado" });

      return res.status(200).json(professional);
    } catch (error) {
      return res.status(500).json({ message: "Error en servidor" });
    }
  }

  async deleteProfessional(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "ID no válido" });

    try {
      const existingProfessional = await this.app.getProfessionalById(id);
      if (!existingProfessional)
        return res.status(404).json({ message: "Profesional no encontrado" });

      const deleted = await this.app.deleteProfessional(id);

      if (!deleted)
        return res
          .status(500)
          .json({ message: "No se pudo eliminar el profesional" });

      return res
        .status(200)
        .json({ message: "Profesional eliminado correctamente" });
    } catch (error) {
      return res.status(500).json({ message: "Error en servidor" });
    }
  }
}