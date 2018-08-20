import createError from 'http-errors'
import express, { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import config from './config'
import session from 'express-session'
import cookieParser from 'cookie-parser';
import logger from 'morgan'
import Logger from './logger'
import indexRouter from './routes'
import usersRouter from './routes/users'
import orderRouter from './routes/order'

class Server {
  private app: express.Application

  constructor () {
    this.app = express()
  }

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
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      Logger.error(err.stack)
      res.status(500).send('Something broke!')
    })
  }

  // 注册中间件
  initMiddlewares () {
    Logger.info('initMiddlewares...')
    this.app.use(logger('dev'))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(cookieParser())
    this.app.use(session({
      secret: 'my_session_secret', // 建议使用 128 个字符的随机字符串
      resave: true,
      saveUninitialized: false,
      cookie: { maxAge: 60 * 1000, httpOnly: true }
    }))
  }
  // 注册路由
  registerRouters () {
    Logger.info('registerRouters...')
    this.app.use('/', indexRouter)
    this.app.use('/user', usersRouter)
    this.app.use('/orders', orderRouter)
    this.app.use((req: Request, res: Response, next: NextFunction) => {
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
    this.app.listen(config.app.port)
    Logger.info('Server is listening port: ' + config.app.port)
    Logger.info(config.baseUrl)
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
