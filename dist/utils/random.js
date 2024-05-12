"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = void 0;
var crypto_1 = __importDefault(require("crypto"));
function random() {
    var buffer = crypto_1.default.randomBytes(3);
    console.log("buffer is", buffer);
    var otp = buffer.toString("hex");
    console.log("otp", otp);
    return otp;
}
exports.random = random;
