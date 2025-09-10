import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";

@Entity("recursos")
export class ResourceEntity {
    @PrimaryGeneratedColumn()
    id_recurso!: number;

    @Column({ type: "varchar", length: 200 })
    titulo!: string;

    @Column({ type: "text", nullable: true })
    descripcion?: string;

    @Column({ type: "varchar", length: 50 })
    tipo!: string;

    @Column({ type: "text", nullable: true })
    url?: string;

    @Column({ type: "int" })
    id_profesional!: number;

    @CreateDateColumn({ name: "fecha_publicacion" })
    fecha_publicacion!: Date;
}