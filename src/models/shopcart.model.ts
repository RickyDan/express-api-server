import mongoose from 'mongoose'
import { Schema, Document } from 'mongoose'

export interface IShoppingCart extends Document {
  goodsCode: String
  goodsName: String
  goodsSummary: String
  goodsImg: String
  goodsType: Number
  goodsPrice: Number
  goodsAttrs: Array<String>
  goodsNumber: Number
  editTime: Date
}

const schema = new Schema({
  goodsCode: String, // 商品id
  goodsName: String, // 商品名称
  goodsSummary: String, // 商品简介
  goodsImg: String, // 商品图片
  goodsType: Number, // 商品分类
  goodsPrice: Number, // 商品标价
  goodsAttrs: [String], // 商品属性
  goodsNumber: Number, // 商品数量
  editTime: {
    type: Date,
    default: Date.now
  }
}, {versionKey: false})

const ShoppingCart = mongoose.model<IShoppingCart>('ShoppingCart', schema)
export default ShoppingCart
