import dotenv from "dotenv";

dotenv.config();

export const port: number = Number(process.env.PORT) || 5000;

export const mongoURI: string = process.env.MONGO_URI || "";

export const dbName: string = process.env.DB_NAME || "";
