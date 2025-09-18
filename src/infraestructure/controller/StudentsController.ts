import { StudentApplicationService } from "../../application/StudentApplicationService";
import { Request, Response } from "express";
import { Students } from "../../domain/Students";

export class StudentsController {
  private app: StudentApplicationService;

  constructor(app: StudentApplicationService) {
    this.app = app;
  }

  async login(req: Request, res: Response): Promise<Response> {
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

      // El service debe devolver { token, user }
      const { token, user } = await this.app.login(email, password);

      // Guardamos el token en cookie HttpOnly
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000, // 1 hora
      });

      // Devolvemos solo datos públicos
      return res.status(200).json({
        id: user.id,
        email: user.mail,
        name: user.name,
        token: token
      });
    } catch (error) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
  }

  async registerStudent(request: Request, response: Response): Promise<Response> {
    const { name, mail, password, lastName, semester, program } = request.body;
    try {
      const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)?$/;
      if (!nameRegex.test(name.trim()))
        return response.status(400).json({ message: "Nombre inválido" });

      if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(mail))
        return response.status(400).json({ error: "Correo electrónico no válido" });

      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,25}$/.test(password))
        return response.status(400).json({
          error:
            "La contraseña debe tener al menos 6 caracteres y máximo 25, incluyendo al menos una letra y un número",
        });

      const status = true;
      const date = new Date();
      const student: Omit<Students, "id"> = {
        name,
        mail,
        password,
        status,
        lastName,
        semester,
        program,
        date,
      };

      const studentId = await this.app.createStudent(student);
      return response
        .status(201)
        .json({ message: "Estudiante registrado correctamente", studentId });
    } catch (error) {
      return response.status(500).json({ message: "Error en servidor" });
    }
  }

  async getAllStudents(request: Request, response: Response): Promise<Response> {
    try {
      const users = await this.app.getAllStudents();
      return response.status(200).json(users);
    } catch (error) {
      return response.status(500).json({ message: "Error en servidor" });
    }
  }

  async getStudentsById(request: Request, response: Response): Promise<Response> {
    try {
      const id = parseInt(request.params.id);
      if (isNaN(id)) {
        return response.status(400).json({ message: "ID inválido" });
      }
      const user = await this.app.getStudentById(id);
      if (!user)
        return response.status(404).json({ message: "Usuario no encontrado" });
      return response.status(200).json(user);
    } catch (error) {
      return response.status(500).json({ message: "Error en servidor" });
    }
  }

  async updateStudent(request: Request, response: Response): Promise<Response> {
    try {
      const id = parseInt(request.params.id);
      if (isNaN(id)) {
        return response.status(400).json({ message: "ID inválido" });
      }
      let { name, mail, password, status } = request.body;

      if (name && !/^[a-zA-Z\s]{3,}$/.test(name.trim()))
        return response.status(400).json({
          message: "El nombre debe tener al menos 3 caracteres y solo contener letras",
        });

      if (mail && !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(mail.trim()))
        return response.status(400).json({ error: "Correo electrónico no válido" });

      if (password && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password.trim()))
        return response.status(400).json({
          message:
            "La contraseña debe tener al menos 6 caracteres, incluyendo al menos una letra y un número",
        });

      status = true;
      const updated = await this.app.updateStudent(id, { name, mail, password, status });
      if (!updated) {
        return response
          .status(404)
          .json({ message: "Usuario no encontrado o no actualizado" });
      }
      return response.status(200).json({ message: "Usuario actualizado con éxito" });
    } catch (error) {
      return response.status(500).json({ message: "Error en servidor" });
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

      const updated = await this.app.updateStudent(id, {
        ...existingUser,
        status: false,
      });

      if (!updated) {
        return response
          .status(500)
          .json({ message: "No se pudo dar de baja al usuario" });
      }

      return response.status(200).json({ message: "Usuario dado de baja correctamente" });
    } catch (error) {
      return response.status(500).json({ message: "Error en servidor" });
    }
  }
}