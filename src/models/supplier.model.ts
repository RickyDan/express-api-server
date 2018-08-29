import { Schema, Model, Document } from 'mongoose'
import mongoose from 'mongoose'

export interface ISupplier extends Document {
  name: String
  phone: String
  img: String
}

const schema = new Schema({
  name: {
    type: String,
    unique: true
  },
  phone: {
    type: String,
    unique: true
  },
  img: String
}, {versionKey: false})

const Supplier = mongoose.model<ISupplier>('Supplier', schema)
export default Supplier


