import dotenv from "dotenv";
dotenv.config();

export const serverPort = Number(process.env.SERVER_PORT) || 7000;

