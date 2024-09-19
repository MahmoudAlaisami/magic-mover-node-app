import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import moverRouter from "./http/routes/mover"
import itemRouter from "./http/routes/item";
import eventRouter from "./http/routes/event";

const createApp = () => {
  const app: Express = express();

  app.use(cors());
  app.use(express.json());

  app.use("/", (req: Request, res: Response, next: NextFunction) => {
    // console.log("....", {body: req.body})
    next();
  });


  app.use("/api/mover", moverRouter)
  app.use("/api/item", itemRouter)
  app.use("/api/event", eventRouter)



  app.get("/", (req: Request, res: Response) => {
    res.send("<h1>Hello world!</h1>");
  });

  return app;
};

export default createApp;
