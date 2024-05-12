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
exports.Application = exports.applicationStatus = void 0;
var typeorm_1 = require("typeorm");
var seeker_entity_1 = require("./seeker.entity");
var applicationStatus;
(function (applicationStatus) {
    applicationStatus["NA"] = "Not Applied";
    applicationStatus["AP"] = "Application Pending";
    applicationStatus["AA"] = "Application Approved";
    applicationStatus["AD"] = "Application Declined";
})(applicationStatus = exports.applicationStatus || (exports.applicationStatus = {}));
var Application = exports.Application = /** @class */ (function () {
    function Application() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Application.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: false }),
        __metadata("design:type", Boolean)
    ], Application.prototype, "admin_status", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "enum",
            enum: applicationStatus,
            default: applicationStatus.NA,
        }),
        __metadata("design:type", String)
    ], Application.prototype, "Application_status", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Application.prototype, "createdDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Application.prototype, "updatedDate", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return seeker_entity_1.Seeker; }, function (seeker) { return seeker.applications; }),
        __metadata("design:type", seeker_entity_1.Seeker)
    ], Application.prototype, "seeker", void 0);
    Application = __decorate([
        (0, typeorm_1.Entity)()
    ], Application);
    return Application;
}());
