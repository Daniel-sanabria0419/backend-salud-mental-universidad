import { Notes } from './Notes';

export interface NotesPorts {
    createNota(nota: Omit<Notes, "id_nota">): Promise<number>;
    getNotaById(id: number): Promise<Notes | null>;
    getAllNotas(): Promise<Notes[]>;
    getNotasByStudentId(studentId: number): Promise<Notes[]>;
    updateNota(id: number, nota: Partial<Notes>): Promise<boolean>;
    deleteNota(id: number): Promise<boolean>;
}