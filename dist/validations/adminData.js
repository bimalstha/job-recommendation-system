"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLoginSchema = exports.adminSignUpSchema = void 0;
var zod_1 = __importDefault(require("zod"));
exports.adminSignUpSchema = zod_1.default.object({
    Full_Name: zod_1.default.string(),
    email: zod_1.default.string().email(),
    password: zod_1.default
        .string()
        .min(6, { message: "password must be alteast 6 characters" }),
    role: zod_1.default.string().optional(),
});
exports.adminLoginSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6, { message: "must be atleast 6 characters" }),
});
