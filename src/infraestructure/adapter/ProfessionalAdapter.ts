// infrastructure/adapters/ProfessionalAdapter.ts
import { Repository } from "typeorm";
import { Professional } from "../../domain/Professional";
import { ProfessionalPorts } from "../../domain/ProfessionalPorts";
import { ProfessionalEntity } from "../entities/ProfessionalEntity";
import { AppDataSource } from "../config/data-base";

export class ProfessionalAdapter implements ProfessionalPorts {
    private professionalRepository: Repository<ProfessionalEntity>;

    constructor() {
        this.professionalRepository = AppDataSource.getRepository(ProfessionalEntity);
    }

    private toDomain(entity: ProfessionalEntity): Professional {
        return {
            id_profesional: entity.id_profesional,
            nombre: entity.nombre,
            apellido: entity.apellido,
            correo: entity.correo,
            contrasena: entity.contrasena,
            fecha_registro: entity.fecha_registro
        };
    }

    private toEntity(professional: Omit<Professional, "id_profesional">): ProfessionalEntity {
        const entity = new ProfessionalEntity();
        entity.nombre = professional.nombre;
        entity.apellido = professional.apellido;
        entity.correo = professional.correo;
        entity.contrasena = professional.contrasena;
        entity.fecha_registro = professional.fecha_registro ?? new Date();
        return entity;
    }

    async createProfessional(professional: Omit<Professional, "id_profesional" | "fecha_registro">): Promise<number> {
        try {
            const newProfessional = this.toEntity({
                ...professional,
                fecha_registro: new Date()
            });
            const savedProfessional = await this.professionalRepository.save(newProfessional);
            return savedProfessional.id_profesional;
        } catch (error) {
            console.error("Error creating professional:", error);
            throw new Error("Error creating professional");
        }
    }

    async getProfessionalById(id: number): Promise<Professional | null> {
        try {
            const entity = await this.professionalRepository.findOneBy({ id_profesional: id });
            return entity ? this.toDomain(entity) : null;
        } catch (error) {
            console.error("Error fetching professional by ID:", error);
            throw new Error("Error fetching professional by ID");
        }
    }

    async getAllProfessionals(): Promise<Professional[]> {
        try {
            const entities = await this.professionalRepository.find();
            return entities.map(this.toDomain);
        } catch (error) {
            console.error("Error fetching all professionals:", error);
            throw new Error("Error fetching all professionals");
        }
    }

    async getProfessionalByEmail(correo: string): Promise<Professional | null> {
        try {
            const entity = await this.professionalRepository.findOneBy({ correo });
            return entity ? this.toDomain(entity) : null;
        } catch (error) {
            console.error("Error fetching professional by email:", error);
            throw new Error("Error fetching professional by email");
        }
    }

    async deleteProfessional(id: number): Promise<boolean> {
        try {
            const existing = await this.professionalRepository.findOneBy({ id_profesional: id });
            if (!existing) {
                throw new Error("Profesional no existe");
            }
            await this.professionalRepository.remove(existing);
            return true;
        } catch (error) {
            console.error("Error deleting professional:", error);
            throw new Error("Error deleting professional");
        }
    }

    async updateProfessional(id: number, professional: Partial<Professional>): Promise<boolean> {
        try {
            const existing = await this.professionalRepository.findOneBy({ id_profesional: id });
            if (!existing) {
                throw new Error("Profesional no existe");
            }
            Object.assign(existing, {
                nombre: professional.nombre ?? existing.nombre,
                apellido: professional.apellido ?? existing.apellido,
                correo: professional.correo ?? existing.correo,
                contrasena: professional.contrasena ?? existing.contrasena
            });
            await this.professionalRepository.save(existing);
            return true;
        } catch (error) {
            console.error("Error updating professional:", error);
            throw new Error("Error updating professional");
        }
    }
}