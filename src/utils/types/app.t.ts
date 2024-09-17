import { Express } from "express";
import { Server } from "http";
import { Connection } from "mongoose";

export type TcreateApp = () => Express;

export type TcreateServer = (app: Express, port: number) => Promise<Server>;

export type TconnectDB = (dbURI: string, dbName: string) => Promise<Connection>;
