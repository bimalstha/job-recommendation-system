"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnect = void 0;
var typeorm_1 = require("typeorm");
require("reflect-metadata");
var config_1 = require("../utils/config");
var AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: config_1.config.host,
    username: config_1.config.username,
    password: config_1.config.password,
    port: config_1.config.port || 5432,
    database: config_1.config.database,
    synchronize: false,
    logging: false,
    entities: ["src/entities/**/*.ts"],
    subscribers: [],
    migrations: ["src/migrations/*.ts"],
});
var DbConnect = function () {
    AppDataSource.initialize()
        .then(function () {
        console.log("Database connected");
    })
        .catch(function (error) {
        console.log(error);
    });
};
exports.DbConnect = DbConnect;
exports.default = AppDataSource;
