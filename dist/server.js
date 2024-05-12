"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var routes_1 = require("./routes");
var server = (0, express_1.default)();
exports.server = server;
dotenv_1.default.config({ path: "./.env.".concat(process.env.NODE_ENV) });
server.use(express_1.default.json());
server.use(routes_1.router);
server.get("/", function (req, res) {
    try {
        var ipp = req.socket.remoteAddress;
        var ip = req.headers["user-agent"];
        res.send("<h1>connected from ip ".concat(ip, "</h1>"));
    }
    catch (error) {
        console.log(error);
    }
});
