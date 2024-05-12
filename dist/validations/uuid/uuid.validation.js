"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodScheme = void 0;
var zod_1 = require("zod");
exports.zodScheme = zod_1.z.string().uuid({ message: "invalid uuid" });
