"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = void 0;
var moment_1 = __importDefault(require("moment"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var hashPassword_1 = require("../../utils/hashPassword");
var storeOtp_1 = require("./storeOtp");
var seekerService_1 = require("../seeker/seekerService");
var employerService_1 = require("../employer/employerService");
function verifyOtp(receiverEmail, otpFrom_user, ipAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var now, data_1, _a, seeker, token, employer, token, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 8, , 9]);
                    now = (0, moment_1.default)().toDate();
                    return [4 /*yield*/, storeOtp_1.otpRepo.find({
                            where: {
                                email: receiverEmail,
                            },
                            order: {
                                createdAt: "DESC",
                            },
                        })];
                case 1:
                    data_1 = _b.sent();
                    if (!(data_1.length < 1)) return [3 /*break*/, 2];
                    throw { message: "internal error occured" };
                case 2:
                    _a = data_1[0].email == receiverEmail;
                    if (!_a) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, hashPassword_1.verifyPassword)(data_1[0].otp, otpFrom_user)];
                case 3:
                    _a = (_b.sent());
                    _b.label = 4;
                case 4:
                    if (!(_a &&
                        data_1[0].expiresAt < now)) return [3 /*break*/, 7];
                    return [4 /*yield*/, seekerService_1.seekerRepository.find({
                            where: {
                                email: receiverEmail,
                            },
                        })];
                case 5:
                    seeker = _b.sent();
                    //token for seeker
                    if (seeker.length > 1) {
                        token = jsonwebtoken_1.default.sign({ id: seeker[0].id }, process.env.SECRETKEY_JWT, { expiresIn: "24h" });
                        return [2 /*return*/, token];
                    }
                    return [4 /*yield*/, employerService_1.employerRepository.find({
                            where: {
                                email: receiverEmail,
                            },
                        })];
                case 6:
                    employer = _b.sent();
                    //token for employer
                    if (employer.length > 1) {
                        token = jsonwebtoken_1.default.sign({ id: seeker[0].id }, process.env.SECRETKEY_JWT, { expiresIn: "24h" });
                        return [2 /*return*/, token];
                    }
                    _b.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_1 = _b.sent();
                    console.log("the error from verifyOtp is", error_1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.verifyOtp = verifyOtp;
