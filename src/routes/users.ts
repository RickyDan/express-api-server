import express from 'express'
import users from '../controllers/login'

const router = express.Router()
/* GET users listing. */
router.get('/captcha', users.captcha)
router.post('/signin', users.login)
router.post('/signup', users.register)

export default router

