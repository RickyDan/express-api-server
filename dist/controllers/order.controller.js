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
const order_model_1 = __importDefault(require("../models/order.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
class OrderController {
    static getOrderById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield order_model_1.default
                .find({ user: req.query.id })
                .limit(5)
                .sort({ createdTime: -1 })
                .exec();
            return res.status(200).json(orders);
        });
    }
    static createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const user = yield user_model_1.default.findOne().exec();
            data.user = user._id;
            const order = yield order_model_1.default.create(data);
            return res.status(200).json(order);
        });
    }
    static updateOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_model_1.default.findOneAndUpdate({ _id: req.query.id }, req.body, {
                new: true
            })
                .exec();
            return res.status(200).json({
                code: '0',
                msg: `update order state ${req.query.id} successful`
            });
        });
    }
    static deleteOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_model_1.default
                .findOneAndRemove({ _id: req.query.id })
                .exec();
            return res.status(200).json({
                code: '0',
                msg: `order ${req.query.id} delete successful`
            });
        });
    }
}
exports.default = OrderController;
//# sourceMappingURL=order.controller.js.map