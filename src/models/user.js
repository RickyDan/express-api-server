import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true }
  },
  mobileNumber: {
    type: String,
    required: true,
    index: { unique: true },
    match: [/^1[34578]\d{9}$/, '请输入正确的手机号格式']
  },
  password: {
    type: String,
    required: true,
  }
})

export default UserSchema.model('User', UserSchema)
