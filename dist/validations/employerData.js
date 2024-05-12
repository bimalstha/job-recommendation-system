"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employerDataSchema = void 0;
var zod_1 = require("zod");
exports.employerDataSchema = zod_1.z.object({
    company_name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6, { message: "atleast use 6 characters" }),
    location: zod_1.z.string(),
    contact: zod_1.z.string().min(10),
    description: zod_1.z.string(),
});
