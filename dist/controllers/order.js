"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = __importDefault(require("../models/order"));
// 查询所有的订单
exports.findAllOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const orders = yield order_1.default.find({}).limit(10).sort({ update_at: -1 });
    try {
        res.json(orders);
    }
    catch (err) {
        res.json(err);
    }
});
// 查找某个订单
exports.findOrderById = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const orders = yield order_1.default.findById(req.query.id);
    try {
        if (orders) {
            res.json(orders);
        }
    }
    catch (err) {
        res.json(err);
    }
});
// 添加一条订单
exports.createOrder = (req, res) => {
    order_1.default.create(req.body, (err) => {
        if (err) {
            res.json(err);
        }
        else {
            res.json({
                code: 0,
                message: '订单创建成功'
            });
        }
    });
};
// 删除一条订单
exports.deleteOrder = (req, res) => {
    order_1.default.findOneAndRemove(req.query.id)
        .then(order => {
        res.json({
            code: 0,
            message: `${order.id}删除成功`
        });
    })
        .catch(err => {
        res.json(err);
    });
};
// 更新一条订单
exports.updateOrder = (req, res) => {
    order_1.default.findOneAndUpdate({ _id: req.query.id }, { $set: {
            channel: req.body.channel,
            storeName: req.body.storeName,
            mobile: req.body.mobile,
            phone: req.body.phone
        } }, {
        new: true
    })
        .then(order => res.json(order))
        .catch(err => res.json(err));
};
//# sourceMappingURL=order.js.map