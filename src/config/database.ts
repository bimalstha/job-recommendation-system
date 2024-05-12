import { DataSource } from "typeorm";
import "reflect-metadata";
import { config } from "../utils/config";

const AppDataSource = new DataSource({
  type: "postgres",
  host: config.host,
  username: config.username,
  password: config.password,
  port: config.port || 5432,
  database: config.database,
  synchronize: true,
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
      console.log(error)
    });
};

export default AppDataSource;

