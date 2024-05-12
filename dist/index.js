"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./.env.".concat(process.env.NODE_ENV) });
var database_1 = require("./config/database");
var server_1 = require("./server");
var PORT = parseInt(process.env.PORT) || 3000;
server_1.server.listen(PORT, function () {
    console.log("the server is listening at", PORT);
});
(0, database_1.DbConnect)();
