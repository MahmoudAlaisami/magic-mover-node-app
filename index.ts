import createApp from "./src/app";
import { createServer } from "./src/config/server";
import { mongoURI, dbName, port } from "./src/config/credentials";

export const startApp = () => {
  try {
    const app = createApp();
    createServer(app, port);
    console.log(".... started");
  } catch (error) {
    console.log("Error starting app:\n", error);
  }
};


startApp();