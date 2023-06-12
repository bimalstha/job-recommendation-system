import express from "express";
import dotenv from "dotenv"
import { router } from "./routes";

const server = express();
dotenv.config()

server.use(express.json());
server.use(router);

server.get("/", (req, res) => {
  try {
    res.send(`<h1>connected</h1>`);
  } catch (error) {
    console.log(error);
  }
});

export { server };
