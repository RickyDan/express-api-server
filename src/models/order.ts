import { Schema, model } from 'mongoose'

const OrderSchema = new Schema({
  channel: {
    type: String,
    required: true
  },
  storeName: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  phone: String,
  sales: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  update_at: Date
})

export default model('Order', OrderSchema)
