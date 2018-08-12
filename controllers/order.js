import Order from '../models/order'

// 查询所有的订单
export const findAllOrder = (req, res) => {
  Order.find({})
    .limit(10)
    .sort({ update_at: -1 })
    .then(orders => {
      res.json(orders)
    }).catch(err => {
      res.json(err)
    })
}

// 查找某个订单
export const findOrderById = (req, res) => {
  Order.findById(req.query.id)
    .then(orders => {
      res.json(orders)
    }).catch(err => {
      res.json(err)
    })
}

// 添加一条订单
export const createOrder = (req, res) => {
  Order.create(req.body, (err, orders) => {
    if (err) {
      res.json(err)
    } else {
      res.json(orders)
    }
  })
}

// 删除一条订单
export const deleteOrder = (req, res) => {
  Order.findOneAndRemove(req.query.id)
    .then(order => {
      res.json({
        code: '0',
        message: `${order.id}删除成功`
      })
    })
    .catch(err => {
      res.json(err)
    })
}

// 更新一条订单
export const updateOrder = (req, res) => {
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
