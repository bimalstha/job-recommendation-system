import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { router } from "./routes";

const server = express();
dotenv.config({ path:`./.env.${process.env.NODE_ENV}` });

server.use(express.json());
server.use(router);

server.get("/", (req: Request, res: Response) => {
  try {
    const ipp = req.socket.remoteAddress
    const ip = req.headers["user-agent"];
    res.send(`<h1>connected from ip ${ip}</h1>`);
  } catch (error) {
    console.log(error);
  }
});

export { server };
