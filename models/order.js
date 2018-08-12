import mongoose from 'mongoose'

const OrderSchema = mongoose.Schema({
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

export default mongoose.model('Order', OrderSchema)
