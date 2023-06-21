import { ConnectOptions, ConnectionOptions, DataSource } from "typeorm";
import "reflect-metadata";
import { config } from "../utils/config";

export const AppDataSource = new DataSource({
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
  // migrationsTableName: "custom_migration_table",
});

// export const MigrationTestSource:ConnectionOptions = {
//   type: 'postgres',
//   host: config.host,
//   username: config.username,
//   password: config.password,
//   port: config.port,
//   database: config.database,
//   synchronize: false,
//   logging: false,
//   entities: ["src/entities/**/*.ts"],
//   subscribers: [],
//   cli: {
//     migrationsDir: 'src/migrations'
//   },
//   // migrations: ["src/migrations/*.ts"],
//   // migrationsTableName: "custom_migration_table",
// };
const DbConnect = (): void => {
  AppDataSource.initialize()
    .then((): void => {
      console.log("Database connected");
    })
    .catch((error) => {
      throw error;
    });
};

// export { DbConnect };
export default AppDataSource;
