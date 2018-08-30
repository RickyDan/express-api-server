"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
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
const privateKey = fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../ca/private.pem'), 'utf-8');
const certificate = fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../ca/file.crt'), 'utf-8');
const credentials = { key: privateKey, cert: certificate };
const app = express_1.default();
const httpServer = http_1.default.createServer(app);
const httpsServer = https_1.default.createServer(credentials, app);
class Server {
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
        app.use((err, req, res, next) => {
            logger_1.default.error(err.stack);
            res.status(500).send('Something broke!');
        });
    }
    // 注册中间件
    initMiddlewares() {
        logger_1.default.info('initMiddlewares...');
        app.use(morgan_1.default('dev'));
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: false }));
        app.use(cookie_parser_1.default());
        app.use(express_session_1.default({
            secret: 'my_session_secret',
            resave: true,
            saveUninitialized: false,
            cookie: { maxAge: 60 * 1000, httpOnly: true }
        }));
    }
    // 注册路由
    registerRouters() {
        logger_1.default.info('registerRouters...');
        app.use('/', routes_1.default);
        app.use('/user', users_route_1.default);
        app.use('/supplier', supplier_route_1.default);
        app.use('/goods', goods_route_1.default);
        app.use('/orders', order_route_1.default);
        app.use((req, res, next) => {
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
        httpServer.listen(Server.PORT, () => {
            logger_1.default.info('HTTP Server is running on: http://localhost:%s', Server.PORT);
        });
        httpsServer.listen(Server.SSLPORT, () => {
            logger_1.default.info('HTTPS Server is running on: http://localhost:%s', Server.SSLPORT);
        });
    }
    static initialize() {
        logger_1.default.info('Initialize server');
        const loader = new Server();
        const db = loader.start();
        loader.listen();
        return db;
    }
}
Server.PORT = 18080;
Server.SSLPORT = 18081;
exports.default = Server;
//# sourceMappingURL=app.js.map