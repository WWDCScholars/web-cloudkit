var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Record, Field } from '.';
export default class Scholar extends Record {
}
Scholar.recordType = 'Scholar';
__decorate([
    Field
], Scholar.prototype, "givenName", void 0);
__decorate([
    Field
], Scholar.prototype, "familyName", void 0);
__decorate([
    Field
], Scholar.prototype, "gender", void 0);
__decorate([
    Field
], Scholar.prototype, "birthday", void 0);
__decorate([
    Field
], Scholar.prototype, "location", void 0);
__decorate([
    Field
], Scholar.prototype, "biography", void 0);
__decorate([
    Field
], Scholar.prototype, "profilePicture", void 0);
__decorate([
    Field
], Scholar.prototype, "scholarPrivate", void 0);
__decorate([
    Field
], Scholar.prototype, "socialMedia", void 0);
__decorate([
    Field
], Scholar.prototype, "wwdcYearInfos", void 0);
__decorate([
    Field
], Scholar.prototype, "wwdcYears", void 0);
__decorate([
    Field
], Scholar.prototype, "gdprConsentAt", void 0);
//# sourceMappingURL=Scholar.js.map