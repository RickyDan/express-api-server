"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("./logger"));
const routes_1 = __importDefault(require("./routes"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const supplier_route_1 = __importDefault(require("./routes/supplier.route"));
const goods_route_1 = __importDefault(require("./routes/goods.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
class Server {
    constructor() {
        this.app = express_1.default();
    }
    connectDB() {
        const options = { useNewUrlParser: true };
        const url = config_1.default.dbUrl;
        logger_1.default.info(`connect to ${url} ...`);
        mongoose_1.default.connect(url, options);
        mongoose_1.default.Promise = global.Promise;
        return mongoose_1.default.connection;
    }
    start() {
        this.connectDB()
            .on('error', logger_1.default.error)
            .on('close', logger_1.default.error)
            .once('open', logger_1.default.info);
    }
    // 错误处理
    errorHandle() {
        this.app.use((err, req, res, next) => {
            logger_1.default.error(err.stack);
            res.status(500).send('Something broke!');
        });
    }
    // 注册中间件
    initMiddlewares() {
        logger_1.default.info('initMiddlewares...');
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(cookie_parser_1.default());
        this.app.use(express_session_1.default({
            secret: 'my_session_secret',
            resave: true,
            saveUninitialized: false,
            cookie: { maxAge: 60 * 1000, httpOnly: true }
        }));
    }
    // 注册路由
    registerRouters() {
        logger_1.default.info('registerRouters...');
        this.app.use('/', routes_1.default);
        this.app.use('/user', users_route_1.default);
        this.app.use('/supplier', supplier_route_1.default);
        this.app.use('/goods', goods_route_1.default);
        this.app.use('/orders', order_route_1.default);
        this.app.use((req, res, next) => {
            res.status(404).send('404 Not Found');
        });
    }
    config() {
        logger_1.default.info('config...');
        this.errorHandle();
        this.initMiddlewares();
        this.registerRouters();
    }
    listen() {
        this.config();
        this.app.listen(config_1.default.app.port);
        logger_1.default.info('Server is listening port: ' + config_1.default.app.port);
        logger_1.default.info(config_1.default.baseUrl);
    }
    static initialize() {
        logger_1.default.info('Initialize server');
        const loader = new Server();
        const db = loader.start();
        loader.listen();
        return db;
    }
}
exports.default = Server;
//# sourceMappingURL=app.js.map