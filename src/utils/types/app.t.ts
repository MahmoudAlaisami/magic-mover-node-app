import { Express } from "express";
import { Server } from "http";
import { Connection } from "mongoose";

export type TcreateApp = () => Express;

export type TcreateServer = (app: Express, port: number) => Promise<void>;

export type TconnectDB = (dbURI: string, dbName: string) => Promise<Connection>;
