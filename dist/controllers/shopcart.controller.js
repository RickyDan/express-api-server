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
const shopcart_model_1 = __importDefault(require("../models/shopcart.model"));
class ShopCartController {
    static getShoppingCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield shopcart_model_1.default
                .find({})
                .exec();
            return res.status(200).json(cart);
        });
    }
}
exports.default = ShopCartController;
//# sourceMappingURL=shopcart.controller.js.map