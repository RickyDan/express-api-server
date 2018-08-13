import Order from '../models/order'
import { Request, Response, NextFunction } from 'express'

// 查询所有的订单
export const findAllOrder = async (req: Request, res: Response) => {
  const orders = await Order.find({}).limit(10).sort({ update_at: -1 })
  try {
    res.json(orders)
  } catch (err) {
    res.json(err)
  }
}

// 查找某个订单
export const findOrderById = async (req: Request, res: Response) => {
  const orders = await Order.findById(req.query.id)
  try {
    if (orders) {
      res.json(orders)
    }
  } catch (err) {
    res.json(err)
  }
}

// 添加一条订单
export const createOrder = (req: Request, res: Response) => {
  Order.create(req.body, (err: any) => {
    if (err) {
      res.json(err)
    } else {
      res.json({
        code: 0,
        message: '订单创建成功'
      })
    }
  })
}

// 删除一条订单
export const deleteOrder = (req: Request, res: Response) => {
  Order.findOneAndRemove(req.query.id)
    .then(order => {
      res.json({
        code: 0,
        message: `${order.id}删除成功`
      })
    })
    .catch(err => {
      res.json(err)
    })
}

// 更新一条订单
export const updateOrder = (req: Request, res: Response) => {
  Order.findOneAndUpdate({_id: req.query.id},
    {$set : {
      channel: req.body.channel,
      storeName: req.body.storeName,
      mobile: req.body.mobile,
      phone: req.body.phone
    }}, {
      new: true
    })
    .then(order => res.json(order))
    .catch(err => res.json(err))
}
