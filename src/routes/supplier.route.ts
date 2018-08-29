import express from 'express'
import SupplierController from '../controllers/supplier.controller'

const router = express.Router()

router.get('/list', SupplierController.getSupplier)
router.post('/create', SupplierController.createSupplier)

export default router
