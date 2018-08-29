import { Document, Model, Schema } from 'mongoose'
import mongoose from 'mongoose'

export interface IGoods extends Document {
  goodsName: String
  goodsSummary: String
  goodsImg: String
  goodsPrice: String
  goodsType: Number
  editTime: Date
  goosAttrs: Array<Object>,
  supplier: {}
}

export interface IGoodsModel extends Model<IGoods> {
  findAllBySupplier(id: string): Promise<IGoods[]>
}

const schema = new Schema({
  goodsName: String, // 商品名称
  goodsSummary: String, // 商品简介
  goodsImg: String, // 商品图片
  goodsPrice: Number, // 商品标价
  goodsType: String, // 商品分类
  editTime: {
    type: Date,
    default: Date.now
  },
  // 商品属性
  goodsAttrs: [String],
  // 供货商
  supplier: {
    type: Schema.Types.ObjectId,
    ref: 'Supplier'
  }
})

schema.static('findAllBySupplier', (supplier: string) => {
  return Goods
    .find({})
    .populate(supplier)
    .lean()
    .exec()
})
const Goods = mongoose.model<IGoods>('Goods', schema) as IGoodsModel
export default Goods
