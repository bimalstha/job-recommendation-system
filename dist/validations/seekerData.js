"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seekerLoginSchema = exports.seekerSchema = void 0;
var zod_1 = require("zod");
exports.seekerSchema = zod_1.z.object({
    full_name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6, { message: "atleast use 6 characters" }),
    contact: zod_1.z.string().min(10),
    location: zod_1.z.string(),
    education_Level: zod_1.z.string(),
    expertise: zod_1.z.string(),
    experience: zod_1.z.string(),
    about_me: zod_1.z.string(),
    profile_photo: zod_1.z.string().optional(),
    C_V: zod_1.z.string(),
});
exports.seekerLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string()
        .min(6, { message: "password must be atleast 6 characters" }),
});
