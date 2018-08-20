import bcrypt from 'bcrypt-nodejs'

class BcryptService {
  constructor () {}

  comparePassword (password: string, hash: string) {
    return bcrypt.compareSync(password, hash)
  }
}

export default new BcryptService()
