"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const schema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
        unique: true
    },
    img: String
}, { versionKey: false });
const Supplier = mongoose_2.default.model('Supplier', schema);
exports.default = Supplier;
//# sourceMappingURL=supplier.model.js.map