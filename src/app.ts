import express, { Express, Request, Response } from "express";
import { TcreateApp } from "./utils/types/app.t";
import cors from "cors";


const createApp = () => {

const app: Express = express();

app.use(cors())
app.use(express.json())

app.get("/", (req, res)=> {
  res.send("Hello world!")
})

return app;
}

export default createApp