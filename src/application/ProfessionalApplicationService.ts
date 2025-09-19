import { ProfessionalPorts } from "../domain/ProfessionalPorts";
import { Professional } from "../domain/Professional";
import { AuthApplication } from "./AuthApplication";
import bcrypt from "bcryptjs";

export class ProfessionalApplicationService {
  private port!: ProfessionalPorts;

  constructor(port: ProfessionalPorts) {
    this.port = port;
  }

  async login(correo: string, contrasena: string): Promise<{ token: string; user: any }> {
    const existingProfessional = await this.port.getProfessionalByEmail(correo);
    if (!existingProfessional) {
      throw new Error("Credenciales inválidas");
    }

    const passwordMatch = await bcrypt.compare(contrasena, existingProfessional.contrasena);
    if (!passwordMatch) {
      throw new Error("Credenciales inválidas");
    }

    const token = AuthApplication.generateToken({
      id_profesional: existingProfessional.id_profesional,
      correo: existingProfessional.correo,
    });

    return { token, user: existingProfessional };
  }

  async createProfessional(user: Omit<Professional, "id_profesional">): Promise<number> {
    const existingProfessional = await this.port.getProfessionalByEmail(user.correo);
    if (!existingProfessional) {
      const hashedPassword = await bcrypt.hash(user.contrasena, 10);
      user.contrasena = hashedPassword;
      return this.port.createProfessional(user);
    }
    throw new Error("El profesional ya existe");
  }

  async updateProfessional(id: number, user: Partial<Professional>): Promise<boolean> {
    const existingProfessional = await this.port.getProfessionalById(id);
    if (!existingProfessional) {
      throw new Error("Profesional no existe");
    }

    if (user.correo) {
      const emailTaken = await this.port.getProfessionalByEmail(user.correo);
      if (emailTaken && emailTaken.id_profesional !== id) {
        throw new Error("Correo ya en uso");
      }
    }

    if (user.contrasena) {
      user.contrasena = await bcrypt.hash(user.contrasena, 10);
    }

    return await this.port.updateProfessional(id, user);
  }

  async deleteProfessional(id: number): Promise<boolean> {
    const existingProfessional = await this.port.getProfessionalById(id);
    if (!existingProfessional) {
      throw new Error("Profesional no existe");
    }
    return await this.port.deleteProfessional(id);
  }

  async getProfessionalById(id: number): Promise<Professional | null> {
    return await this.port.getProfessionalById(id);
  }

  async getProfessionalByEmail(correo: string): Promise<Professional | null> {
    return await this.port.getProfessionalByEmail(correo);
  }

  async getAllProfessionals(): Promise<Professional[]> {
    return await this.port.getAllProfessionals();
  }
}