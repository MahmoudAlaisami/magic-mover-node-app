import { Express } from "express";
import http from "http";
import { TcreateServer } from "../utils/types/app.t";


let server: http.Server;

const shutdownServer = async (): Promise<void> => {
  if (server) {
    try {
      await new Promise<void>((resolve, reject) => {
        server.close((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    } catch (err) {
      console.error("Error closing the server:", err);
    }
  }
};

const handleUnhandledRejection = async (
  reason: any,
  promise: Promise<any>
): Promise<void> => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  await shutdownServer();
  process.exit(1);
};

const handleUncaughtException = async (error: any): Promise<void> => {
  console.error("Uncaught Exception thrown:", error);
  await shutdownServer();
  process.exit(1);
};

export const createServer: TcreateServer = async (
  app: Express,
  port: number,
): Promise<void> => {
  try {
    server = app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });

    process.on("unhandledRejection", handleUnhandledRejection);
    process.on("uncaughtException", handleUncaughtException);
  } catch (error) {
    console.error("Server Error", error);
    process.exit(1);
  }
};
