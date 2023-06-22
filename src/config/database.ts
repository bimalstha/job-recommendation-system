import { DataSource } from "typeorm";
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
  migrations: ["src/migrations/*.ts"],
});

export const DbConnect = (): void => {
  AppDataSource.initialize()
    .then((): void => {
      console.log("Database connected");
    })
    .catch((error) => {
      throw error;
    });
};

export default AppDataSource;

