import { DataSource } from "typeorm";
import { StudentEntity } from "../entities/StudentEntity";
import envs from "../config/environment-vars";
import  dotenv  from "dotenv";
import { ResourceEntity } from "../entities/ResourceEntity";

 dotenv.config();
 export const AppDataSource = new DataSource({
    type: "postgres",
    host: envs.DB_HOST,
    port: Number(envs.DB_PORT),
    username: envs.DB_USER,
    password:envs.DB_PASSWORD,
    database: envs.DB_NAME,
    schema: envs.DB_SCHEMA,
    synchronize: true,
    logging: false,
    entities: [StudentEntity, ResourceEntity]
  });

  // CONEXION A LA BASE DE DATOS
  export const connectDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Database connection established successfully.");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1); // Exit the process with failure
    }
  }