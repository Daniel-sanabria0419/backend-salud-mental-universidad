import { StudentApplicationService } from "../../application/StudentApplicationService";
import { Request, Response } from "express";
import { Students } from "../../domain/Students";
 
export class StudentsController {
 
    private app: StudentApplicationService;
 
    constructor(app: StudentApplicationService) {
        this.app = app;
    }

    async login(req: Request, res: Response): Promise<string | Response>{
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json({ error: "Email y contraseña son requeridos" });
 
      // Validación de email
      if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email))
        return res.status(400).json({ error: "Correo electrónico no válido" });
 
      // Validación de contraseña
      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,25}$/.test(password))
        return res.status(400).json({
          error:
            "La contraseña debe tener al menos 6 caracteres y máximo 25, incluyendo al menos una letra y un número",
        });
 
      const token = await this.app.login(email, password);
      return res.status(200).json({ token });
     
    } catch (error) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  }
 
 
    async registerStudent(request: Request, response: Response): Promise<Response> {
        const { name, mail, password, lastName, semester, program } = request.body;
        try {
            const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)?$/;
            if (nameRegex.test(name.trim())) return response.status(400).json({ message: "error en dato" })
 
            if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(mail))
                return response.status(400).json({ error: "Correo electrónico no válido" });
 
            if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,25}$/.test(password))
                return response.status(400).json({
                    error:
                        "La contraseña debe tener al menos 6 caracteres y máximo 25, incluyendo al menos una letra y un número",
                });
            const status = true;
            const date = new Date();
            const student: Omit<Students, "id"> = { name, mail, password, status, lastName, semester, program, date }
            const studentId = await this.app.createStudent(student);
            return response
                .status(201).json({ message: "Estudiante registrado correctamente", studentId });
 
        } catch (error) {
            return response.status(500).json({ message: "error on server" });
        }
        return response.status(500).json({ message: "error on server" });
    }
    async getAllStudents(request: Request, response: Response): Promise<Response> {
        try {
            const users = await this.app.getAllStudents();
            return response.status(200).json(users);
        } catch (error) {
            return response.status(500).json({ message: "error on server" });
        }
    }
     async getStudentsById(request: Request, response: Response): Promise<Response> {
        try {
            const id = parseInt(request.params.id);
            if (isNaN(id)) {
                return response.status(400).json({ message: "Invalid user ID" });
            }
            const user = await this.app.getStudentById(id);
            if (!user)
                return response.status(404).json({ message: "User not found" });
            return response.status(200).json(user);
        } catch (error) {
            return response.status(500).json({ message: "error on server" });
        }
    }
 
    async updateStudent(request: Request, response: Response): Promise<Response> {
        try {
            const id = parseInt(request.params.id);
            if (isNaN(id)) {
                return response.status(400).json({ message: "Invalid user ID" });
            }
            let { name, mail, password, status } = request.body;
            // Validaciones antes de actualizar
      if (name && !/^[a-zA-Z\s]{3,}$/.test(name.trim()))
        return response
          .status(400)
          .json({
            message:
              "El nombre debe tener al menos 3 caracteres y solo contener letras",
          });
 
      if (mail && !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(mail.trim()))
        return response.status(400).json({ error: "Correo electrónico no válido" });
 
      if (password && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password.trim()))
        return response
          .status(400)
          .json({
            message:
              "La contraseña debe tener al menos 6 caracteres, incluyendo al menos una letra y un número",
          });
 
      status = true;
          const updated = await this.app.updateStudent(id, { name, mail, password, status });
            if (!updated) {
                return response.status(404).json({ message: "Error al encontrar el user no se actualizaron datos " });
            }
            return response.status(200).json({ message: "Usuario actualizado con exito " });
        } catch (error) {
            return response.status(500).json({ message: "error on server" });
        }
    }
    
async getstudentByEmail(request: Request, response: Response): Promise<Response> {
  const email = request.params.email;

  if (!email || !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return response.status(400).json({ message: "Correo electrónico no válido" });
  }

  try {
    const user = await this.app.getStudentByEmail(email);
    if (!user) {
      return response.status(404).json({ message: "Usuario no encontrado" });
    }
    return response.status(200).json(user);
  } catch (error) {
    return response.status(500).json({ message: "Error en servidor" });
  }
}
// Dar de baja (cambiar status a 0 en vez de borrar)
async deleteStudent(request: Request, response: Response): Promise<Response> {
  const id = parseInt(request.params.id);

  if (isNaN(id)) {
    return response.status(400).json({ message: "ID no válido" });
  }

  try {
    const existingUser = await this.app.getStudentById(id);
    if (!existingUser) {
      return response.status(404).json({ message: "Usuario no encontrado" });
    }

    // en vez de borrar -> actualizar status a 0
    const updated = await this.app.updateStudent(id, { ...existingUser, status: false });
    if (!updated) {
      return response.status(500).json({ message: "No se pudo dar de baja al usuario" });
    }

    return response.status(200).json({ message: "Usuario dado de baja correctamente" });
  } catch (error) {
    return response.status(500).json({ message: "Error en servidor" });
  }
}


    
}
//tarea terminar la consulta por email y dar de baja (delete)
 