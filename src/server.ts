import express from "express";
import { DbConnect } from "./config/database";

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  try {
    res.send(`<h1>connected</h1>`);
  } catch (error) {
    console.log(error);
  }
});

DbConnect();

export { server };
