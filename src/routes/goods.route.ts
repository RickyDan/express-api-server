import express from 'express'
import GoodsController from '../controllers/goods.controller'

const router = express.Router()

router.get('/list', GoodsController.getGoodsList)
router.post('/create', GoodsController.createGoods)
router.get('/', GoodsController.getGoodsById)
router.delete('/remove', GoodsController.deleteGoods)
router.put('/update', GoodsController.updateGoods)
export default router
