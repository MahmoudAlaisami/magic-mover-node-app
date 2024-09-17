import { Express } from "express";
import { Connection } from "mongoose";

export type TcreateApp = () => Express

export type TcreateServer = (
  app: Express,
  port: number,
) => Promise<void>;

export type TconnectDB = (url: string, dbName: string) => Promise<Connection>;
