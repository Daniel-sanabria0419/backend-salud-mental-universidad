
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "estudiantes"})
export class StudentEntity {

    @PrimaryGeneratedColumn()
    id_estudiante!: number;

    @Column({ type: 'character varying', length: 100})
    nombre!: string;

     @Column({ type: 'character varying', length: 100})
    apellido!: string;


    @Column({ type: 'character varying', length: 150 })
    correo!: string;

    @Column({ type: 'character varying', length: 200 })
    contrasena!: string;

    @Column({ type: 'int'})
    semestre!: number;

     @Column({ type: 'character varying', length: 100 })
    carrera!: string;

     @Column({ type: 'timestamp without time zone'})
    fecha_registro!: Date;

    @Column({ type: "boolean", default: true })
    status_estudiante!: boolean;
}