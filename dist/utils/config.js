"use strict";
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var environment = process.env.NODE_ENV || 'production';
exports.config = {
    type: (_a = process.env.db_type) !== null && _a !== void 0 ? _a : "postgres",
    host: (_b = process.env.db_host) !== null && _b !== void 0 ? _b : "localhost",
    port: (_c = parseInt(process.env.db_port)) !== null && _c !== void 0 ? _c : 5432,
    database: (_d = process.env.db_database) !== null && _d !== void 0 ? _d : "jbs",
    username: (_e = process.env.db_username) !== null && _e !== void 0 ? _e : "postgres",
    password: (_f = process.env.db_password) !== null && _f !== void 0 ? _f : "pass",
};
