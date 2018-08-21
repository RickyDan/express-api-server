"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
class BcryptService {
    constructor() { }
    comparePassword(password, hash) {
        return bcrypt_nodejs_1.default.compareSync(password, hash);
    }
}
exports.default = new BcryptService();
//# sourceMappingURL=bcrypt.service.js.map