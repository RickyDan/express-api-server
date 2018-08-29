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
const supplier_model_1 = __importDefault(require("../models/supplier.model"));
class SupplierController {
    static createSupplier(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplier = yield supplier_model_1.default.create(req.body);
            return res.status(200).json(supplier);
        });
    }
    static getSupplierList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplier = yield supplier_model_1.default
                .find({})
                .exec();
            return res.status(200).json(supplier);
        });
    }
    static getSupplier(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const supplier = yield supplier_model_1.default
                .findById(req.query.id)
                .exec();
            return res.status(200).json(supplier);
        });
    }
    static deleteSupplier(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield supplier_model_1.default
                .findByIdAndRemove(req.query.id)
                .exec();
            return res.status(200).json({
                code: '0',
                msg: `delete supplier ${req.query.id} successful`
            });
        });
    }
    static updateSupplier(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield supplier_model_1.default
                .findOneAndUpdate({ _id: req.query.id }, req.body, {
                new: true
            })
                .exec();
            return res.status(200).json({
                code: 0,
                msg: `Update supplier${req.query.id} successful`
            });
        });
    }
}
exports.default = SupplierController;
//# sourceMappingURL=supplier.controller.js.map