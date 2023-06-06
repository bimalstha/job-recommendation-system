import { DataSource } from "typeorm";
import "reflect-metadata";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "pass",
    port: 5432,
    database: "jbs",
    synchronize: true,
    logging: false,
    entities: ["src/entities/**/*.ts"],
    subscribers: [],
    migrations: []
})

const DbConnect = (): void => {
    AppDataSource.initialize()
        .then((): void => {
            console.log("Database connected");
        })
        .catch((error) => { throw error.message })
}

export { AppDataSource, DbConnect }