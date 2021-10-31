import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import { IUser } from '../@types'
import User from '../models/userSchema'
import bcrypt from 'bcryptjs'

const signUpUser: RequestHandler = async (req, res, next) => {
  const { name, email, password }: IUser = req.body
  try {
    const emailExists = await User.findOne({ email })
    if (emailExists) {
      return next(createHttpError(422, 'Email already exists'))
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      name,
      email,
      password: hashedPassword
    })

    await user.save()
    res.status(200).json({ message: 'new user registered' })
  } catch (error) {
    return next(createHttpError.InternalServerError)
  }
}

export default signUpUser
