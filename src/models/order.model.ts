import { Document, Model, Schema } from 'mongoose'
import mongoose from 'mongoose'

export interface IOrder extends Document {
  state: Number
  createTime: Date
  dealTime: Date
  orderTotal: Number
  actuaPayment: Number
  user: {}
  goods: Array<Object>
}

export interface IOrderModel extends Model<IOrder> {
  findAllByUser(id: string): Promise<IOrder[]>
}

const schema = new Schema({
  state: Number, // 订单状态
  createTime: {
    type: Date,
    default: Date.now
  }, // 订单时间
  dealTime: {
    type: Date,
    default: ''
  }, // 订单成交时间
  orderTotal: {
    type: Number,
    min: 0,
    max: 100
  }, // 订单总价
  actuaPayment: {
    type: Number,
    min: 0
  }, // 实付款
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  // 订单中商品详情
  goods: [{
    goodsCode: String, // 商品id
    goodsName: String, // 商品名称
    goodsSummary: String, // 商品简介
    goodsImg: String, // 商品图片
    goodsPrice: Number, // 商品标价
    goodsType: String, // 商品分类
    goodsAttrs: [String] // 商品属性
  }]
}, {versionKey: false})

schema.static('findAllByUser', (user: string) => {
  return Order
    .find({user: user})
    .limit(10)
    .lean()
    .exec()
})
const Order = mongoose.model<IOrder>('Order', schema) as IOrderModel
export default Order
