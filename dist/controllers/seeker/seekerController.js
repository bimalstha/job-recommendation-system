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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seekerController = void 0;
var express_1 = require("express");
var seekerData_1 = require("../../validations/seekerData");
var seekerService_1 = require("../../services/seeker/seekerService");
var hashPassword_1 = require("../../utils/hashPassword");
var loginLoggerMiddleware_1 = require("../../middlewares/security/loginLoggerMiddleware");
exports.seekerController = (0, express_1.Router)();
exports.seekerController.post("/register-seeker", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, full_name, email, password, location_1, contact, education_Level, expertise, experience, about_me, hashpassword, seekerData, register_seeker, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, full_name = _a.full_name, email = _a.email, password = _a.password, location_1 = _a.location, contact = _a.contact, education_Level = _a.education_Level, expertise = _a.expertise, experience = _a.experience, about_me = _a.about_me;
                seekerData_1.seekerSchema.parse(req.body);
                return [4 /*yield*/, (0, hashPassword_1.hashPassword)(password)];
            case 1:
                hashpassword = _b.sent();
                seekerData = {
                    full_name: full_name,
                    email: email,
                    hashpassword: hashpassword,
                    location: location_1,
                    contact: contact,
                    education_Level: education_Level,
                    expertise: expertise,
                    experience: experience,
                    about_me: about_me,
                };
                return [4 /*yield*/, (0, seekerService_1.registerSeeker)(seekerData)];
            case 2:
                register_seeker = _b.sent();
                return [2 /*return*/, res.status(200).send({ msg: "".concat(register_seeker.msg) })];
            case 3:
                error_1 = _b.sent();
                console.log("the error from the seeker login controller is", error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.seekerController.post("/login", loginLoggerMiddleware_1.loginLogger, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, data_1, seeker_login, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, email = _a.email, password = _a.password;
                seekerData_1.seekerLoginSchema.parse(req.body);
                data_1 = { email: email, password: password };
                return [4 /*yield*/, (0, seekerService_1.seekerLogin)(data_1)];
            case 1:
                seeker_login = _b.sent();
                return [2 /*return*/, res
                        .status(200)
                        .send({ token: seeker_login, msg: "login successful" })];
            case 2:
                error_2 = _b.sent();
                console.log("the error while login seeker is", error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
