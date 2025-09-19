import { Repository } from "typeorm";
import { Notes } from '../../domain/Notes';
import { NotesPorts } from "../../domain/NotesPorts";
import { NotesEntity } from "../entities/NotesEntity";
import { AppDataSource } from "../config/data-base";
import { Notes as NotesDomain } from "../../domain/Notes";

export class NotasAdapter implements NotesPorts {

    private notasRepository: Repository<NotesEntity>;

    constructor(){
        this.notasRepository = AppDataSource.getRepository(NotesEntity);
    }

    private toDomain(nota: NotesEntity): NotesDomain {
        return {
            id_nota: nota.id_nota,
            id_estudiante: nota.id_estudiante,
            nota: nota.nota,
            fecha_creacion: nota.fecha_creacion
        }
    }

    private toEntity(notas: Omit<NotesDomain, "id_nota">): NotesEntity {
        const notasEntity = new NotesEntity();
        notasEntity.id_estudiante = notas.id_estudiante;
        notasEntity.nota = notas.nota;
        if (notas.fecha_creacion) {
            notasEntity.fecha_creacion = notas.fecha_creacion;
        }
        return notasEntity;
    }
    
    async createNota(nota: Omit<Notes, "id_nota">): Promise<number> {
       try{
        const newNota = this.toEntity(nota);
        const savedNota = this.notasRepository.save(newNota);
        return (await savedNota).id_nota;
       }catch(error){
        console.error("Error creating nota:", error);
        throw new Error("Error creating nota");
       }
    }

    async getNotaById(id: number): Promise<Notes | null> {
        try{
            const nota = await this.notasRepository.findOneBy({ id_nota: id });
            return nota ? this.toDomain(nota) : null;
        }catch(error){
            console.error("Error fetching nota by ID:", error);
            throw new Error("Error fetching nota by ID");
        }
    }

    async getAllNotas(): Promise<Notes[]> {
        try{
            const notas = await this.notasRepository.find();
            return notas.map(this.toDomain);
        }catch(error){
            console.error("Error fetching all notas:", error);
            throw new Error("Error fetching all notas");
        }
    }

    async getNotasByStudentId(studentId: number): Promise<Notes[]> {
        try{
            const notas = await this.notasRepository.find({ 
                where: { id_estudiante: studentId },
                order: { fecha_creacion: 'DESC' }
            });
            return notas.map(this.toDomain);
        }catch(error){
            console.error("Error fetching notas by student ID:", error);
            throw new Error("Error fetching notas by student ID");
        }
    }

    async updateNota(id: number, nota: Partial<Notes>): Promise<boolean> {
        try{
            const existingNota = await this.notasRepository.findOneBy({ id_nota: id });
            if (!existingNota) {
                throw new Error('Nota no existe');
            }
            Object.assign(existingNota, {
                nota: nota.nota ?? existingNota.nota
            });
            await this.notasRepository.save(existingNota);
            return true;
        }catch(error){
            console.error("Error updating nota:", error);
            throw new Error("Error updating nota");
        }
    }

    async deleteNota(id: number): Promise<boolean> {
        try{
            const existingNota = await this.notasRepository.findOneBy({ id_nota: id });
            if (!existingNota) {
                throw new Error('Nota no existe');
            }
            await this.notasRepository.remove(existingNota);
            return true;
        }catch(error){
            console.error("Error deleting nota:", error);
            throw new Error("Error deleting nota");
        }
    }
}