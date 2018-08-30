import createError from 'http-errors'
import express, { Request, Response, NextFunction } from 'express'
import fs from 'fs'
import path from 'path'
import http from 'http'
import https from 'https'
import mongoose from 'mongoose'
import config from './config'
import session from 'express-session'
import cookieParser from 'cookie-parser';
import logger from 'morgan'
import Logger from './logger'
import indexRouter from './routes'
import usersRouter from './routes/users.route'
import supplierRouter from './routes/supplier.route'
import goodsRouter from './routes/goods.route'
import orderRouter from './routes/order.route'

const privateKey = fs.readFileSync(path.resolve(__dirname, '../ca/private.pem'), 'utf-8')
const certificate = fs.readFileSync(path.resolve(__dirname, '../ca/file.crt'), 'utf-8')
const credentials = {key: privateKey, cert: certificate}
const app = express()
const httpServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app)
class Server {
  private static PORT = 18080
  private static SSLPORT = 18081
  connectDB () {
    const options = { useNewUrlParser: true }
    const url = config.dbUrl
    Logger.info(`connect to ${url} ...`)
    mongoose.connect(url, options)
    mongoose.Promise = global.Promise
    return mongoose.connection
  }

  start () {
    this.connectDB()
      .on('error', Logger.error)
      .on('close', Logger.error)
      .once('open', Logger.info)
  }

  // 错误处理
  errorHandle () {
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      Logger.error(err.stack)
      res.status(500).send('Something broke!')
    })
  }

  // 注册中间件
  initMiddlewares () {
    Logger.info('initMiddlewares...')
    app.use(logger('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser())
    app.use(session({
      secret: 'my_session_secret', // 建议使用 128 个字符的随机字符串
      resave: true,
      saveUninitialized: false,
      cookie: { maxAge: 60 * 1000, httpOnly: true }
    }))
  }
  // 注册路由
  registerRouters () {
    Logger.info('registerRouters...')
    app.use('/', indexRouter)
    app.use('/user', usersRouter)
    app.use('/supplier', supplierRouter)
    app.use('/goods', goodsRouter)
    app.use('/orders', orderRouter)
    app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).send('404 Not Found')
    })
  }

  config () {
    Logger.info('config...')
    this.errorHandle()
    this.initMiddlewares()
    this.registerRouters()
  }

  listen () {
    this.config()
    httpServer.listen(Server.PORT, () => {
      Logger.info('HTTP Server is running on: http://localhost:%s', Server.PORT)
    })
    httpsServer.listen(Server.SSLPORT, () => {
      Logger.info('HTTPS Server is running on: http://localhost:%s', Server.SSLPORT)
    })
  }

  static initialize () {
    Logger.info('Initialize server')
    const loader = new Server()
    const db = loader.start()
    loader.listen()
    return db
  }
}
export default Server
