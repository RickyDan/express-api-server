import express from 'express'
import {
  findAllOrder,
  findOrderById,
  createOrder,
  deleteOrder,
  updateOrder
} from '../controllers/order'

const router = express.Router()

router.get('/', findAllOrder)
router.get('/query', findOrderById)
router.post('/add', createOrder)
router.delete('/remove', deleteOrder)
router.put('/update', updateOrder)

export default router
