"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const router = express_1.default.Router();
/* GET users listing. */
router.get('/captcha', user_controller_1.default.captcha);
router.post('/signin', user_controller_1.default.login);
router.post('/signup', user_controller_1.default.register);
exports.default = router;
//# sourceMappingURL=users.route.js.map