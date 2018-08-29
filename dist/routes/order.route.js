"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = __importDefault(require("../controllers/order.controller"));
const router = express_1.default.Router();
router.get('/', order_controller_1.default.getOrderById);
router.post('/create', order_controller_1.default.createOrder);
router.put('/update', order_controller_1.default.updateOrder);
router.delete('/remove', order_controller_1.default.deleteOrder);
exports.default = router;
//# sourceMappingURL=order.route.js.map