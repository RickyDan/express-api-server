import { Request, Response } from 'express'
import ShopModel from '../models/shopcart.model'

export default class ShopCartController {
  static async getShoppingCart (req: Request, res: Response) {
    const cart = await ShopModel
      .find({})
      .exec()
    return res.status(200).json(cart)
  }
}
