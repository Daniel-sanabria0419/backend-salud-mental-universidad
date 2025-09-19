import * as Joi from "joi";
import "dotenv/config";

// define el tipo de variables de entorno
export type RetureEnvironmentVariables = {
  PORT: number; 
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_SCHEMA: string;
}

type ValidatedEnvironmentVariables = {
    error: Joi.ValidationError | undefined;
    value: RetureEnvironmentVariables;
}

function validateEnvVars(Vars:NodeJS.ProcessEnv): ValidatedEnvironmentVariables {
  const schema = Joi.object({
    PORT: Joi.number().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(3306),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().allow("").optional(),
    DB_NAME: Joi.string().required(),
      DB_SCHEMA: Joi.string().required()

  }).unknown(true);

  const { error, value } = schema.validate(Vars);

  return { error, value };
}

const loadedEnvVars =(): RetureEnvironmentVariables => {
    const result = validateEnvVars(process.env);
    if (result.error) {
        throw new Error(`Error en las variables de entorno: ${result.error.message}`);
    }

    const value = result.value;
    return {
        PORT: value.PORT,
        DB_HOST: value.DB_HOST,
        DB_PORT: value.DB_PORT,
        DB_USER: value.DB_USER,
        DB_PASSWORD: value.DB_PASSWORD,
        DB_NAME: value.DB_NAME,
        DB_SCHEMA: value.DB_SCHEMA,
    }
}

const envs = loadedEnvVars();
export default envs;