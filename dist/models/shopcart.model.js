"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const schema = new mongoose_2.Schema({
    goodsCode: String,
    goodsName: String,
    goodsSummary: String,
    goodsImg: String,
    goodsType: Number,
    goodsPrice: Number,
    goodsAttrs: [String],
    goodsNumber: Number,
    editTime: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });
const ShoppingCart = mongoose_1.default.model('ShoppingCart', schema);
exports.default = ShoppingCart;
//# sourceMappingURL=shopcart.model.js.map