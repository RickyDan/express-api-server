import express from 'express'
const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('How to debug express with tpyescript')
})

export default router