// domain/ProfessionalPorts.ts
import { Professional } from './Professional';

export interface ProfessionalPorts {
    createProfessional(professional: Omit<Professional, "id_profesional" | "fecha_registro">): Promise<number>;
    updateProfessional(id: number, professional: Partial<Professional>): Promise<boolean>;
    deleteProfessional(id: number): Promise<boolean>;
    getProfessionalById(id: number): Promise<Professional | null>;
    getAllProfessionals(): Promise<Professional[]>;
    getProfessionalByEmail(correo: string): Promise<Professional | null>;
}