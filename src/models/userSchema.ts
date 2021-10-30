import mongoose from 'mongoose'

interface User {
  name: string
  id: string
}

const userSchema = new mongoose.Schema<User>({
  name: {
    type: 'string',
    required: true
  },
  id: {
    type: 'string',
    required: true
  }
})

const User = mongoose.model<User>('User', userSchema)

export default User
