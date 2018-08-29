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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const svg_captcha_1 = __importDefault(require("svg-captcha"));
const user_model_1 = __importDefault(require("../models/user.model"));
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt_service_1 = __importDefault(require("../services/bcrypt.service"));
class Login {
    // 生成验证码
    captcha(req, res) {
        const captcha = svg_captcha_1.default.create({
            noise: 1,
            color: true
        });
        req.session.captcha = captcha.text.toLowerCase();
        res.type('svg');
        res.status(200).send(captcha.data);
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, captcha } = req.body;
            if (!captcha) {
                return res.status(401).json({ msg: 'captcha is a require property' });
            }
            if (req.session.captcha !== captcha) {
                return res.status(401).json({ msg: 'Invalid captcha' });
            }
            if (username && password) {
                try {
                    const user = yield user_model_1.default.findOne({
                        username
                    });
                    if (!user) {
                        return res.status(400).json({ msg: 'Bad Request: User not found' });
                    }
                    const token = jwt.sign({ user: user }, 'An express application');
                    if (bcrypt_service_1.default.comparePassword(password, user.password)) {
                        return res.status(200).json({ token, user });
                    }
                    return res.status(401).json({ msg: 'Unauthorized ' });
                }
                catch (err) {
                    return res.status(500).json({ msg: 'Internal server error ' });
                }
            }
            return res.status(400).json({ msg: 'Bad Request: Username or password is wrong' });
        });
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { mobile, password, username } = req.body;
            if (!username) {
                return res.status(400).json({ message: 'Username is a require property' });
            }
            if (!mobile) {
                return res.status(400).json({ message: 'Mobile is a require property' });
            }
            if (!password) {
                return res.status(400).json({ message: 'Password is a require property' });
            }
            const user = new user_model_1.default({
                mobile,
                password,
                username
            });
            user_model_1.default.findOne({ username }, (err, existingUser) => {
                if (err) {
                    return next(err);
                }
                if (existingUser) {
                    res.status(400).json({ message: 'Username address already exists ' });
                    return;
                }
                user.save((err) => {
                    if (err) {
                        return next(err);
                    }
                    res.status(200).json({ message: 'Register Success' });
                });
            });
        });
    }
}
exports.default = new Login();
//# sourceMappingURL=user.controller.js.map