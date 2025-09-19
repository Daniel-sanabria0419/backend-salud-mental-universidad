import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "notas"})
export class NotesEntity {

    @PrimaryGeneratedColumn()
    id_nota!: number;

    @Column({ type: 'int'})
    id_estudiante!: number;

    @Column({ type: 'text'})
    nota!: string;

    @Column({ type: 'timestamp without time zone', default: () => 'CURRENT_TIMESTAMP'})
    fecha_creacion!: Date;
}