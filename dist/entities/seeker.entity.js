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
exports.Seeker = void 0;
var typeorm_1 = require("typeorm");
var application_entity_1 = require("./application.entity");
var Seeker = exports.Seeker = /** @class */ (function () {
    function Seeker() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Seeker.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Seeker.prototype, "full_name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ unique: true }),
        __metadata("design:type", String)
    ], Seeker.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Seeker.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Seeker.prototype, "contact", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Seeker.prototype, "location", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Seeker.prototype, "education_Level", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Seeker.prototype, "expertise", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Seeker.prototype, "experience", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Seeker.prototype, "about_me", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: "not uploaded" }),
        __metadata("design:type", String)
    ], Seeker.prototype, "profile_photo", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Seeker.prototype, "C_V", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Seeker.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Seeker.prototype, "updatedDate", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return application_entity_1.Application; }, function (application) { return application.seeker; }),
        __metadata("design:type", Array)
    ], Seeker.prototype, "applications", void 0);
    Seeker = __decorate([
        (0, typeorm_1.Entity)()
    ], Seeker);
    return Seeker;
}());
