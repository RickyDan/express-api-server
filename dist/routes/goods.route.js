"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const goods_controller_1 = __importDefault(require("../controllers/goods.controller"));
const router = express_1.default.Router();
router.get('/list', goods_controller_1.default.getGoodsList);
router.post('/create', goods_controller_1.default.createGoods);
router.get('/', goods_controller_1.default.getGoodsById);
router.delete('/remove', goods_controller_1.default.deleteGoods);
router.put('/update', goods_controller_1.default.updateGoods);
exports.default = router;
//# sourceMappingURL=goods.route.js.map