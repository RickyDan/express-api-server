import express from 'express'
import OrderController from '../controllers/order.controller'

const router = express.Router()

router.get('/', OrderController.getOrderById)
router.post('/create', OrderController.createOrder)
router.put('/update', OrderController.updateOrder)
router.delete('/remove', OrderController.deleteOrder)

export default router
