import { model, Schema } from 'mongoose'
import { IUser } from '../@types'

const userSchema: Schema = new Schema<IUser>({
  name: {
    type: 'string',
    required: true
  },
  email: {
    type: 'string',
    unique: true,
    required: true
  },
  password: {
    type: 'string',
    required: true
  },
  isVerified: {
    type: 'boolean',
    default: false
  },
  verifyToken: {
    type: 'string'
  }
})

const User = model<IUser>('User', userSchema)

export default User
