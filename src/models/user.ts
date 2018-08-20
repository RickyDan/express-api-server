import bcrypt from 'bcrypt-nodejs'
import mongoose from 'mongoose'

export type UserModel = mongoose.Document & {
  email: string,
  password: string,
  username: string
}

type comparePasswordFunction = (cadidatePassword: string, cb: (err: any, isMatch: any) => {}) => void

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true }
}, { timestamps: true })

userSchema.pre('save', function save(next) {
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

userSchema.methods.comparePassword = comparePassword

const User = mongoose.model('User', userSchema)
export default User
