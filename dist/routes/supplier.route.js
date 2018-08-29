"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supplier_controller_1 = __importDefault(require("../controllers/supplier.controller"));
const router = express_1.default.Router();
router.get('/list', supplier_controller_1.default.getSupplier);
router.post('/create', supplier_controller_1.default.createSupplier);
exports.default = router;
//# sourceMappingURL=supplier.route.js.map