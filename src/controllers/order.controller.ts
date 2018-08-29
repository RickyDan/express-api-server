import { Request, Response } from 'express'
import Order from '../models/order.model'
import User from '../models/user.model'

export default class OrderController {
  static async getOrderById (req: Request, res: Response) {
    const orders = await Order
      .find({user: req.query.id})
      .limit(5)
      .sort({ createdTime: -1 })
      .exec()
    return res.status(200).json(orders)
  }

  static async createOrder (req: Request, res: Response) {
    const data = req.body
    const user = await User.findOne().exec()
    data.user = user._id
    const order = await Order.create(data)
    return res.status(200).json(order)
  }

  static async updateOrder (req: Request, res: Response) {
    await User.findOneAndUpdate({_id: req.query.id}, req.body, {
      new: true
    })
    .exec()
    return res.status(200).json({
      code: '0',
      msg: `update order state ${req.query.id} successful`
    })
  }
  static async deleteOrder (req: Request, res: Response) {
    await User
      .findOneAndRemove({_id: req.query.id})
      .exec()
    return res.status(200).json({
      code: '0',
      msg: `order ${req.query.id} delete successful`
    })
  }
}
