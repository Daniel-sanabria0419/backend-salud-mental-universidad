<<<<<<< HEAD
import { request, response, Router } from "express";
import { StudentAdapter } from "../adapter/StudentAdapter";
import { StudentApplicationService } from "../../application/StudentApplicationService";
import { StudentsController } from '../controller/StudentsController';
import { authenticateToken } from "../web/authMiddleware";

const router = Router();

// inicialización de capas -> Adapter, Application, Controller
const studentAdapter = new StudentAdapter();
const userApp = new StudentApplicationService(studentAdapter);
const studentsController = new StudentsController(userApp);

// Endpoints
router.post("/login", async(request,response)=>{
  await studentsController.login(request,response)
})

// Obtener todos los usuarios
router.get("/students", authenticateToken, async (request, response) => {
  try {
    await studentsController.getAllStudents(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al obtener usuarios" });
  }
});

// Obtener usuario por ID
router.get("/students/:id",authenticateToken, async (request, response) => {
  try {
    await studentsController.getStudentsById(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al obtener usuario" });
  }
});

// Obtener usuario por email
router.get("/students/email/:email",authenticateToken, async (request, response) => {
  try {
    await studentsController.getstudentByEmail(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al obtener usuario por email" });
  }
});

// Crear usuario
router.post("/students", async (request, response) => {
  try {
    await studentsController.registerStudent(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al registrar usuario" });
  }
});

// Actualizar usuario
router.put("/students/:id",authenticateToken, async (request, response) => {
  try {
    await studentsController.updateStudent(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al actualizar usuario" });
  }
});

// Dar de baja (status = 0)
router.delete("/students/:id",authenticateToken, async (request, response) => {
  try {
    await studentsController.deleteStudent(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al dar de baja usuario" });
  }
});

export default router;
=======
import { request, response, Router } from "express";
import { StudentAdapter } from "../adapter/StudentAdapter";
import { StudentApplicationService } from "../../application/StudentApplicationService";
import { StudentsController } from '../controller/StudentsController';
import { authenticateToken } from "../web/authMiddleware";

const router = Router();

// inicialización de capas -> Adapter, Application, Controller
const studentAdapter = new StudentAdapter();
const userApp = new StudentApplicationService(studentAdapter);
const studentsController = new StudentsController(userApp);

// Endpoints
router.post("/login", async(request,response)=>{
  await studentsController.login(request,response)
})

// Obtener todos los usuarios
router.get("/students", authenticateToken, async (request, response) => {
  try {
    await studentsController.getAllStudents(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al obtener usuarios" });
  }
});

// Obtener usuario por ID
router.get("/students/:id",authenticateToken, async (request, response) => {
  try {
    await studentsController.getStudentsById(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al obtener usuario" });
  }
});

// Obtener usuario por email
router.get("/students/email/:email",authenticateToken, async (request, response) => {
  try {
    await studentsController.getstudentByEmail(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al obtener usuario por email" });
  }
});

// Crear usuario
router.post("/students", async (request, response) => {
  try {
    await studentsController.registerStudent(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al registrar usuario" });
  }
});

// Actualizar usuario
router.put("/students/:id",authenticateToken, async (request, response) => {
  try {
    await studentsController.updateStudent(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al actualizar usuario" });
  }
});

// Dar de baja (status = 0)
router.delete("/students/:id",authenticateToken, async (request, response) => {
  try {
    await studentsController.deleteStudent(request, response);
  } catch (error) {
    response.status(400).json({ message: "Error al dar de baja usuario" });
  }
});

export default router;
>>>>>>> 2b14ab01396e9883608d676b6e1ff018bea2a53f
