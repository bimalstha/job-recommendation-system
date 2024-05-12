"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vacancySchema = void 0;
var zod_1 = require("zod");
exports.vacancySchema = zod_1.z.object({
    title: zod_1.z.string().min(3),
    description: zod_1.z.string(),
    location: zod_1.z.string(),
    // id: z.string().uuid(),
});
