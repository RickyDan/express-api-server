import { Request, Response } from 'express'
import Supplier from '../models/supplier.model'

export default class SupplierController {
  static async createSupplier (req: Request, res: Response) {
    const supplier = await Supplier.create(req.body)
    return res.status(200).json(supplier)
  }

  static async getSupplierList (req: Request, res: Response) {
    const supplier = await Supplier
      .find({})
      .exec()
    return res.status(200).json(supplier)
  }

  static async getSupplier (req: Request, res: Response) {
    const supplier = await Supplier
      .findById(req.query.id)
      .exec()
    return res.status(200).json(supplier)
  }

  static async deleteSupplier (req: Request, res: Response) {
    await Supplier
      .findByIdAndRemove(req.query.id)
      .exec()
    return res.status(200).json({
      code: '0',
      msg: `delete supplier ${req.query.id} successful`
    })
  }

  static async updateSupplier (req: Request, res: Response) {
    await Supplier
      .findOneAndUpdate({_id: req.query.id}, req.body, {
        new: true
      })
      .exec()
    return res.status(200).json({
      code: 0,
      msg: `Update supplier${req.query.id} successful`
    })
  }
}
