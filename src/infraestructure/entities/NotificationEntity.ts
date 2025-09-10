import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("notificacionesenfermeria")
export class NotificationEntity {
    @PrimaryGeneratedColumn({ name: "id_notificacion" })
    id!: number;

    @Column({ name: "id_estudiante" })
    idEstudiante!: number;

    @Column({ name: "id_profesional", nullable: true, type: "int" })
    idProfesional?: number | null;

    @Column()
    mensaje!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    fecha!: Date;

    @Column({ default: false })
    leido!: boolean;
    
}
