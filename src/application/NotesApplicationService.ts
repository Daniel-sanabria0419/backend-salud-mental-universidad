import { NotesPorts } from '../domain/NotesPorts';
import { Notes } from '../domain/Notes';

export class NotesApplicationService {
    private port!: NotesPorts;
    constructor(port: NotesPorts) {
        this.port = port;
    }
    
    async createNota(nota: Omit<Notes, "id_nota">): Promise<number> {
        // Validaciones de negocio
        if (!nota.nota || nota.nota.trim().length === 0) {
            throw new Error('La nota no puede estar vacía');
        }
        
        if (nota.nota.length > 1000) {
            throw new Error('La nota no puede exceder 1000 caracteres');
        }

        if (!nota.id_estudiante || nota.id_estudiante <= 0) {
            throw new Error('ID de estudiante inválido');
        }

        return this.port.createNota(nota);
    }

    async updateNota(id: number, nota: Partial<Notes>): Promise<boolean> {
        const existingNota = await this.port.getNotaById(id);
        if (!existingNota) {
            throw new Error('Nota no existe');
        }

        if (nota.nota !== undefined) {
            if (nota.nota.trim().length === 0) {
                throw new Error('La nota no puede estar vacía');
            }
            
            if (nota.nota.length > 1000) {
                throw new Error('La nota no puede exceder 1000 caracteres');
            }
        }

        return await this.port.updateNota(id, nota);
    }

    async deleteNota(id: number): Promise<boolean> {
        const existingNota = await this.port.getNotaById(id);
        if (!existingNota) {
            throw new Error('Nota no existe');
        }
        return await this.port.deleteNota(id);
    }

    async getNotaById(id: number): Promise<Notes | null> {
        if (id <= 0) {
            throw new Error('ID inválido');
        }
        return await this.port.getNotaById(id);
    }

    async getAllNotas(): Promise<Notes[]> {
        return await this.port.getAllNotas();
    }

    async getNotasByStudentId(studentId: number): Promise<Notes[]> {
        if (studentId <= 0) {
            throw new Error('ID de estudiante inválido');
        }
        return await this.port.getNotasByStudentId(studentId);
    }
}