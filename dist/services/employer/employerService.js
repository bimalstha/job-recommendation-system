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
exports.loginEmployer = exports.registerEmployer = exports.employerRepository = void 0;
var database_1 = __importDefault(require("../../config/database"));
var employer_entity_1 = require("../../entities/employer.entity");
var hashPassword_1 = require("../../utils/hashPassword");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var sendOtp_1 = require("../multifactor/sendOtp");
exports.employerRepository = database_1.default.getRepository(employer_entity_1.Employer);
var registerEmployer = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var findExistedEmployer, register, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                findExistedEmployer = exports.employerRepository.find({
                    where: {
                        email: data.email,
                    },
                });
                if (findExistedEmployer) {
                    throw { msg: "user with this email already exist" };
                }
                register = exports.employerRepository.create(data);
                return [4 /*yield*/, exports.employerRepository.save(register)];
            case 1:
                _a.sent();
                return [2 /*return*/, { msg: "registration successful" }];
            case 2:
                error_1 = _a.sent();
                console.log("the error from the register employer service is", error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.registerEmployer = registerEmployer;
var loginEmployer = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var findEmployer, verifypassword, token, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, exports.employerRepository.find({
                        where: {
                            email: data.email,
                        },
                    })];
            case 1:
                findEmployer = _a.sent();
                if (!findEmployer) {
                    throw { msg: "invalid credentials" };
                }
                return [4 /*yield*/, (0, hashPassword_1.verifyPassword)(findEmployer[0].Password, data.password)];
            case 2:
                verifypassword = _a.sent();
                if (!hashPassword_1.verifyPassword) {
                    throw { msg: "invalid credentials" };
                }
                //sending otp to user for 2FA
                return [4 /*yield*/, (0, sendOtp_1.sendOtpMail)(findEmployer[0].email)];
            case 3:
                //sending otp to user for 2FA
                _a.sent();
                token = jsonwebtoken_1.default.sign({ id: findEmployer[0].id }, process.env.SECRETKEY_JWT);
                return [2 /*return*/, token];
            case 4:
                error_2 = _a.sent();
                console.log("the error from employer login service is", error_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.loginEmployer = loginEmployer;
