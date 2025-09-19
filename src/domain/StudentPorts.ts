<<<<<<< HEAD
import { Students } from './Students';

export interface StudentsPorts {
    createStudent(student: Omit<Students, "id">): Promise<number>;
    updateStudent(id:number,student:Partial<Students>): Promise<boolean>;
    deleteStudent(id:number): Promise<boolean>;
    getStudentById(id:number): Promise<Students | null>;
    getAllStudents(): Promise<Students[]>;
    getStudentByEmail(email: string): Promise<Students | null>;
=======
import { Students } from './Students';

export interface StudentsPorts {
    createStudent(student: Omit<Students, "id">): Promise<number>;
    updateStudent(id:number,student:Partial<Students>): Promise<boolean>;
    deleteStudent(id:number): Promise<boolean>;
    getStudentById(id:number): Promise<Students | null>;
    getAllStudents(): Promise<Students[]>;
    getStudentByEmail(email: string): Promise<Students | null>;
>>>>>>> 2b14ab01396e9883608d676b6e1ff018bea2a53f
}