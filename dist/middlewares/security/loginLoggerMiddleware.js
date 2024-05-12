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
exports.clearFailedLoginAttempts = exports.failedLoginAttempts = exports.loginLogger = void 0;
var database_1 = __importDefault(require("../../config/database"));
var loginLogger_entity_1 = require("../../entities/security/loginLogger.entity");
var loggerRepo = database_1.default.getRepository(loginLogger_entity_1.LoginLogger);
// function to check if multiple login attempts is made from same device within short period of time
// because it might be the hacking attempts
function loginLogger(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var IPAddress, currentDate, data_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    IPAddress = req.socket.remoteAddress;
                    currentDate = new Date().toJSON().slice(0, 10);
                    return [4 /*yield*/, loggerRepo.find({
                            where: {
                                ipAddress: IPAddress,
                            },
                            order: { createdAt: "DESC" },
                        })];
                case 1:
                    data_1 = _a.sent();
                    if (data_1.length > 0) {
                        if (data_1[0].createdAt.toString() == currentDate && data_1[0].trial >= 5) {
                            return [2 /*return*/, res.status(500).send({ message: "to many attempts for login" })];
                        }
                    }
                    next();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log("the error from the login logger middleware is", error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.loginLogger = loginLogger;
//updating failed login attempts
function failedLoginAttempts(ipAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var IPAddress, currentDate, data_2, resetLogin, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    IPAddress = ipAddress;
                    currentDate = new Date().toJSON().slice(0, 10);
                    return [4 /*yield*/, loggerRepo.find({
                            where: {
                                ipAddress: ipAddress,
                            },
                            order: {
                                createdAt: "DESC",
                            },
                        })];
                case 1:
                    data_2 = _a.sent();
                    if (data_2.length > 0) {
                        if (data_2[0].ipAddress == ipAddress &&
                            data_2[0].createdAt.toString() == currentDate) {
                            return [2 /*return*/, loggerRepo.update(data_2[0].id, { trial: data_2[0].trial + 1 })];
                        }
                    }
                    resetLogin = new loginLogger_entity_1.LoginLogger();
                    resetLogin.ipAddress = ipAddress;
                    resetLogin.trial = 1;
                    loggerRepo.save(resetLogin);
                    return [2 /*return*/];
                case 2:
                    error_2 = _a.sent();
                    console.log("the error from the failed login attempt middleware is", error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.failedLoginAttempts = failedLoginAttempts;
//clearing failed login attempts
function clearFailedLoginAttempts(ipAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var IPAddress, data_3, i, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    IPAddress = ipAddress;
                    return [4 /*yield*/, loggerRepo.find({
                            where: {
                                ipAddress: IPAddress,
                            },
                        })];
                case 1:
                    data_3 = _a.sent();
                    if (!(data_3.length > 0)) return [3 /*break*/, 5];
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < data_3.length)) return [3 /*break*/, 5];
                    return [4 /*yield*/, loggerRepo.remove(data_3[i])];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_3 = _a.sent();
                    console.log("the error from the clearFailedLoginAttempts is", error_3);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.clearFailedLoginAttempts = clearFailedLoginAttempts;
