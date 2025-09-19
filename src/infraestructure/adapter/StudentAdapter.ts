import { Repository } from "typeorm";
import { Students } from '../../domain/Students';
import { StudentsPorts } from "../../domain/StudentPorts";
import { StudentEntity } from "../entities/StudentEntity";
import { AppDataSource } from "../config/data-base";
import { Students as StudentDomain } from "../../domain/Students";
import { number, object } from "joi";

export class StudentAdapter implements StudentsPorts {

    private studentsRepository: Repository<StudentEntity>;

    constructor(){
        this.studentsRepository = AppDataSource.getRepository(StudentEntity);
    }

    private toDomain(student: StudentEntity): StudentDomain {
        return{
            id: student.id_estudiante,
            name: student.nombre,
            lastName:student.apellido,
            mail: student.correo,
            password: student.contrasena,
            semester: student.semestre,
            program: student.carrera,
            date: student.fecha_registro,
            status: student.status_estudiante}

        }
    private toEntity(Students: Omit<StudentDomain, "id">): StudentEntity {
        const studentEntity = new StudentEntity();
        studentEntity.nombre = Students.name;
        studentEntity.apellido = Students.lastName;

        studentEntity.correo = Students.mail;
        studentEntity.contrasena = Students.password;        
        studentEntity.semestre = Students.semester;
        studentEntity.carrera = Students.program;
        studentEntity.fecha_registro = Students.date;
        studentEntity.status_estudiante = Students.status; 
        return studentEntity;
    }
    
    async createStudent(student: Omit<Students, "id">): Promise<number> {
       try{
        const newStudent = this.toEntity(student);
        const savedStudent = this.studentsRepository.save(newStudent);
        return (await savedStudent).id_estudiante;

       }catch(error){
        console.error("Error creating student:", error);
        throw new Error("Error creating student");

       }
    }

    async getStudentById(id: number): Promise<Students | null> {
        try{
            const user = await this.studentsRepository.findOneBy({ id_estudiante: id });
            return user ? this.toDomain(user) : null;
        }catch(error){
            console.error("Error fetching user by ID:", error);
            throw new Error("Error fetching user by ID");
        }
    }

    async getAllStudents(): Promise<Students[]> {
        try{
            const students = await this.studentsRepository.find();
            return students.map(this.toDomain);
        }catch(error){
            console.error("Error fetching all students:", error);
            throw new Error("Error fetching all students");
        }
    }

    async getStudentByEmail(email: string): Promise<Students | null> {
        try{
            const students = await this.studentsRepository.findOneBy({ correo: email });
            return students ? this.toDomain(students) : null;
        }catch(error){
            console.error("Error fetching students by email:", error);
            throw new Error("Error fetching students by email");
        }
    }

    async deleteStudent(id: number): Promise<boolean> {
        try{
            const existingStudent = await this.studentsRepository.findOneBy({ id_estudiante: id });
            if (!existingStudent) {
                throw new Error('Usuario no existe');
            }
            Object.assign(existingStudent,{
                status_estudiante: 0
            })
            await this.studentsRepository.save(existingStudent);
            return true;
        }catch(error){
            console.error("Error deleting student:", error);
            throw new Error("Error deleting student");
        }
    }

    async updateStudent(id: number, student: Partial<Students>): Promise<boolean> {
        try{
            const existingStudent = await this.studentsRepository.findOneBy({ id_estudiante: id });
            if (!existingStudent) {
                throw new Error('student no existe');
            }
            Object.assign(existingStudent,{
                name_user: student.name ?? existingStudent.nombre,
                email_user: student.mail ?? existingStudent.correo,
                password_user: student.password ?? existingStudent.contrasena,
                status_estudiante: 1
            })
            await this.studentsRepository.save(existingStudent);
            return true;
        }catch(error){
            console.error("Error updating student:", error);
            throw new Error("Error updating student");
          
        }
    }
}

