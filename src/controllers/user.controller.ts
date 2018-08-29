import { Request, Response, NextFunction } from 'express'
import svgCaptcha from 'svg-captcha'
import User from '../models/user.model'
import * as jwt from 'jsonwebtoken'
import bcryptService from '../services/bcrypt.service'

class Login {
  // 生成验证码
  captcha (req: Request, res: Response) {
    const captcha = svgCaptcha.create({
      noise: 1,
      color: true
    })
    req.session.captcha = captcha.text.toLowerCase()
    res.type('svg')
    res.status(200).send(captcha.data)
  }

  async login (req: Request, res: Response) {
    const { username, password, captcha } = req.body
    if (!captcha) {
      return res.status(401).json({ msg: 'captcha is a require property' })
    }
    if (req.session.captcha !== captcha) {
      return res.status(401).json({ msg: 'Invalid captcha'})
    }
    if (username && password) {
      try {
        const user: any = await User.findOne({
          username
        })
        if (!user) {
          return res.status(400).json({ msg: 'Bad Request: User not found' })
        }
        const token = jwt.sign({ user: user }, 'An express application')
        if (bcryptService.comparePassword(password, user.password)) {
          return res.status(200).json({ token, user })
        }
        return res.status(401).json({ msg: 'Unauthorized '})
      } catch (err) {
        return res.status(500).json({ msg: 'Internal server error '})
      }
    }
    return res.status(400).json({ msg: 'Bad Request: Username or password is wrong' })
  }

  async register (req: Request, res: Response, next: NextFunction) {
    const { mobile, password, username } = req.body
    if (!username) {
      return res.status(400).json({ message: 'Username is a require property' })
    }
    if (!mobile) {
      return res.status(400).json({ message: 'Mobile is a require property' })
    }
    if (!password) {
      return res.status(400).json({ message: 'Password is a require property' })
    }
    const user = new User({
      mobile,
      password,
      username
    })
    User.findOne({ username }, (err, existingUser) => {
      if (err) { return next(err) }
      if (existingUser) {
        res.status(400).json({ message: 'Username address already exists ' })
        return
      }
      user.save((err) => {
        if (err) { return next(err) }
        res.status(200).json({ message: 'Register Success' })
      })
    })
  }
}

export default new Login()
