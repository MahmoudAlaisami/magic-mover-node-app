
import { compileFunction } from "vm";
import { TconnectDB } from "../utils/types/app.t"
import mongoose, { ConnectOptions } from "mongoose";
import { readFileSync } from "fs";


const connectDb: TconnectDB = async(dbURI, dbName) => {
  if(!dbURI) throw new Error("MONGO_URI is not defined in environment variables.");

  const options: ConnectOptions = {dbName}
  try {
    const { connection } = await mongoose.connect(dbURI, options);

    await connection.asPromise();

    console.log("Connected to MongoDB");

    return connection
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
}

export default connectDb