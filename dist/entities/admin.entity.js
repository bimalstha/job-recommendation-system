"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = exports.adminRole = void 0;
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var adminRole;
(function (adminRole) {
    adminRole["SA"] = "Super Admin";
    adminRole["MA"] = "Moderator Admin";
})(adminRole = exports.adminRole || (exports.adminRole = {}));
var Admin = exports.Admin = /** @class */ (function () {
    function Admin() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], Admin.prototype, "full_name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ unique: true }),
        (0, class_validator_1.IsEmail)({}, { message: "Please provide a valid email address." }),
        __metadata("design:type", String)
    ], Admin.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Admin.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: adminRole,
            default: adminRole.MA,
        }),
        __metadata("design:type", String)
    ], Admin.prototype, "role", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Admin.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Admin.prototype, "updatedDate", void 0);
    Admin = __decorate([
        (0, typeorm_1.Entity)()
    ], Admin);
    return Admin;
}());
