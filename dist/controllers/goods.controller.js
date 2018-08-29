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
const goods_model_1 = __importDefault(require("../models/goods.model"));
class GoodsController {
    static getGoodsList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const goods = yield goods_model_1.default.findAllBySupplier('supplier');
            return res.status(200).json(goods);
        });
    }
    static createGoods(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const goods = yield goods_model_1.default.create(data);
            return res.status(200).json(goods);
        });
    }
    static getGoodsById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const goods = yield goods_model_1.default
                .findById(req.query.id)
                .populate('supplier')
                .exec();
            return res.status(200).json(goods);
        });
    }
    static deleteGoods(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const goods = yield goods_model_1.default
                .findOneAndRemove(req.query.id)
                .exec();
            return res.status(200).json({
                code: 0,
                msg: `Delete Goods${req.query.id} successful`
            });
        });
    }
    static updateGoods(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const goods = yield goods_model_1.default
                .findOneAndUpdate({ _id: req.query.id }, req.body, {
                new: true
            })
                .exec();
            return res.status(200).json({
                code: 0,
                msg: `Update Goods${req.query.id} successful`
            });
        });
    }
}
exports.default = GoodsController;
//# sourceMappingURL=goods.controller.js.map