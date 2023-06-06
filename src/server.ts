import express from "express"
import { DbConnect } from "./config/database"


const server = express()
DbConnect();

export { server }