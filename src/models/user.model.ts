import bcrypt from 'bcrypt-nodejs'
import mongoose from 'mongoose'
import { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  username: String
  mobile: String
  password: String
  nickname: String
  summary: String
  gender: String
  editTime: Date
  createdTime: Date
}

type comparePasswordFunction = (cadidatePassword: string, cb: (err: any, isMatch: any) => {}) => void

const schema = new Schema({
  username: {
    type: String,
    required: [true, 'username is a require property']
  },
  mobile: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  nickname: String,
  summary: String,
  userImg: String,
  gender: String,
  editTime: {
    type: Date,
    default: Date.now
  },
  createdTime: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false })

schema.pre('save', function save(next) {
  const user: any = this
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
      if (err) { return next(err) }
      user.password = hash
      next()
    })
  })
})

const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
    cb(err, isMatch)
  })
}

schema.methods.comparePassword = comparePassword

const User = mongoose.model<IUser>('User', schema)
export default User
