# express版 restful api 服务

### 一、简介
Typescript 编写的 express rest 服务，采用的技术栈为 Express + Typescript + Docker + mongodb + mongoose。 主要是提供一个电商的基础模型，用户注册、登录、商品查找、添加到购物车、下单、支付等功能。

### 运行环境
node6.0、mongo3.0、mongoose5.0、typescript2.6 以上的版本

### 项目运行
```bash
git clone git@github.com:RickyDan/express-api-server.git
cd express-api-server
npm install
```
开发环境下运行
```bash
npm run watch
```
生产环境下运行
```bash
npm run build
```

### 待完善的问题
Docker 的打包上线、
容器编排问题、
pm2 运用在生产环境下、
用户的权限控制问题

