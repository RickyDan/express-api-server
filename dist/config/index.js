"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const baseConfig = {
    app: {
        port: PORT
    },
    baseUrl: 'http://localhost:' + PORT + '',
    dbUrl: 'mongodb://localhost:27017/test'
};
exports.default = baseConfig;
//# sourceMappingURL=index.js.map