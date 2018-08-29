"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const schema = new mongoose_1.Schema({
    goodsName: String,
    goodsSummary: String,
    goodsImg: String,
    goodsPrice: Number,
    goodsType: String,
    editTime: {
        type: Date,
        default: Date.now
    },
    // 商品属性
    goodsAttrs: [String],
    // 供货商
    supplier: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Supplier'
    }
});
schema.static('findAllBySupplier', (supplier) => {
    return Goods
        .find({})
        .populate(supplier)
        .lean()
        .exec();
});
const Goods = mongoose_2.default.model('Goods', schema);
exports.default = Goods;
//# sourceMappingURL=goods.model.js.map