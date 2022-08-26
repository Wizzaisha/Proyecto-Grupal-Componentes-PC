// import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
// process.env.NODE_ENV = process.env.NODE_ENV || "development";

// const envFound = dotenv.config(); // config() leerá su archivo .env, analizará el contenido, lo asignará a process.env.
// if (envFound.error) {
//   // This error should crash whole process

//   throw new Error("⚠️  Couldn't find .env file  ⚠️");
// }

export const env = {
  port: process.env.PORT,
  databaseURL: process.env.DATABASE_URI,
  database: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
  },
  signature: process.env.SECRET,
  expiration: process.env.EXPIRATION_LOGIN,
  expirationRT: process.env.EXPIRATION_REFRESHTOKEN,
  algorithm: process.env.ALGORITHM,
  admin: process.env.ADMIN,
  profesor: process.env.PROFESOR,
  alumno: process.env.ALUMNO,
  instructorado: process.env.INSTRUCTORADO,
  especializacion: process.env.ESPECIALIZACION,
  profesorado: process.env.PROFESORADO,
};
