import {  DataSource } from "typeorm";
import "reflect-metadata";
import { config } from "../utils/config";

const AppDataSource = new DataSource({
  type: "postgres",
  host: config.host,
  username: config.username,
  password: config.password,
  port: config.port,
  database: config.database,
  synchronize: false,
  logging: false,
  entities: ["src/entities/**/*.ts"],
  subscribers: [],
  migrations: ["src/migrations/*.ts"]
});

export default AppDataSource;
