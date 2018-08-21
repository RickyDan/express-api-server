"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    channel: {
        type: String,
        required: true
    },
    storeName: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    phone: String,
    sales: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    update_at: Date
});
exports.default = mongoose_1.model('Order', OrderSchema);
//# sourceMappingURL=order.js.map