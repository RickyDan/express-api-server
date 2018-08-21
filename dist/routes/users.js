"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("../controllers/login"));
const router = express_1.default.Router();
/* GET users listing. */
router.get('/captcha', login_1.default.captcha);
router.post('/signin', login_1.default.login);
router.post('/signup', login_1.default.register);
exports.default = router;
//# sourceMappingURL=users.js.map