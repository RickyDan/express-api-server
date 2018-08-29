import { Request, Response } from 'express'
import Goods from '../models/goods.model'
import { exec } from 'child_process';

export default class GoodsController {
  static async getGoodsList (req: Request, res: Response) {
    const goods = await Goods.findAllBySupplier('supplier')
    return res.status(200).json(goods)
  }

  static async createGoods (req: Request, res: Response) {
    const data = req.body
    const goods = await Goods.create(data)
    return res.status(200).json(goods)
  }

  static async getGoodsById (req: Request, res: Response) {
    const goods = await Goods
      .findById(req.query.id)
      .populate('supplier')
      .exec()
    return res.status(200).json(goods)
  }

  static async deleteGoods (req: Request, res: Response) {
    const goods = await Goods
      .findOneAndRemove(req.query.id)
      .exec()
    return res.status(200).json({
      code: 0,
      msg: `Delete Goods${req.query.id} successful`
    })
  }

  static async updateGoods (req: Request, res: Response) {
    const goods = await Goods
      .findOneAndUpdate({_id: req.query.id}, req.body, {
        new: true
      })
      .exec()
    return res.status(200).json({
      code: 0,
      msg: `Update Goods${req.query.id} successful`
    })
  }
}
