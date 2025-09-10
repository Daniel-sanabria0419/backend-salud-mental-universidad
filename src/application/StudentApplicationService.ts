import { StudentsPorts } from '../domain/StudentPorts';
import { Students } from '../domain/Students';
import { AuthApplication } from './AuthApplication';
import bcrypt from 'bcryptjs';

export class StudentApplicationService {
    private port!: StudentsPorts;
    constructor(port: StudentsPorts) {
        this.port = port;
    }

    async login(email: string, password: string): Promise<string> {
        const existingUser = await this.port.getStudentByEmail(email);
        if (!existingUser) {
            throw new Error("Credentials are Invalid");
        }
        const passwordMath = await bcrypt.compare(password, existingUser.password);
        if (!passwordMath) {
            throw new Error("Credentials are Invalid");
        }
        const token = AuthApplication.generateToken({
            id: existingUser.id,
            email: existingUser.mail
        });
 
        return token;
    }
    
    async createStudent(user:Omit<Students, "id">):Promise<number>{
        const existingUser = await this.port.getStudentByEmail(user.mail);
        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(user.password,10)
            user.password = hashedPassword;
            return this.port.createStudent(user);
        }
        throw new Error('Usuario ya existe');
    }

    async updateStudent(id:number, user:Partial<Students>):Promise<boolean>{
        const existingUser = await this.port.getStudentById(id);
        if (!existingUser) {
            throw new Error('Usuario no existe');
        }
        if (user.mail){
             const emailTaken = await this.port.getStudentByEmail(user.mail);
             if (emailTaken && emailTaken.id !== user.id) {
                 throw new Error('Email ya en uso');
             }
        }

        return await this.port.updateStudent(id,user);
    }

    async deleteStudentById(id:number):Promise<boolean>{
        const existingUser = await this.port.getStudentById(id);
        if (!existingUser) {
            throw new Error('Usuario no existe');
        }
        return await this.port.deleteStudent(id);
    }

    async getStudentById(id:number):Promise<Students|null>{
        return await this.port.getStudentById(id);
    }
    async getStudentByEmail(email:string):Promise<Students|null>{
        return await this.port.getStudentByEmail(email);
    }
    async getAllStudents():Promise<Students[]>{
        return await this.port.getAllStudents();
    }


}