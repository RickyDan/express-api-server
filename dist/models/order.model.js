"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const schema = new mongoose_1.Schema({
    state: Number,
    createTime: {
        type: Date,
        default: Date.now
    },
    dealTime: {
        type: Date,
        default: ''
    },
    orderTotal: {
        type: Number,
        min: 0,
        max: 100
    },
    actuaPayment: {
        type: Number,
        min: 0
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    // 订单中商品详情
    goods: [{
            goodsCode: String,
            goodsName: String,
            goodsSummary: String,
            goodsImg: String,
            goodsPrice: Number,
            goodsType: String,
            goodsAttrs: [String] // 商品属性
        }]
}, { versionKey: false });
schema.static('findAllByUser', (user) => {
    return Order
        .find({ user: user })
        .limit(10)
        .lean()
        .exec();
});
const Order = mongoose_2.default.model('Order', schema);
exports.default = Order;
//# sourceMappingURL=order.model.js.map