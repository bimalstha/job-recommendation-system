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
exports.Vacancy = void 0;
var typeorm_1 = require("typeorm");
var employer_entity_1 = require("./employer.entity");
var Vacancy = exports.Vacancy = /** @class */ (function () {
    function Vacancy() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Vacancy.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Vacancy.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Vacancy.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Vacancy.prototype, "location", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: false }),
        __metadata("design:type", Boolean)
    ], Vacancy.prototype, "admin_status", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Vacancy.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Vacancy.prototype, "updatedDate", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return employer_entity_1.Employer; }, function (employer) { return employer.vacancies; }),
        __metadata("design:type", employer_entity_1.Employer)
    ], Vacancy.prototype, "employer", void 0);
    Vacancy = __decorate([
        (0, typeorm_1.Entity)()
    ], Vacancy);
    return Vacancy;
}());
