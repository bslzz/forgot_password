import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import { IUser } from '../@types'
import User from '../models/userSchema'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signUpUser: RequestHandler = async (req, res, next) => {
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
    console.log('signUpError =>', error)
    return next(createHttpError.InternalServerError)
  }
}

export const signInUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return next(createHttpError(404, 'User Not Found'))
    }
    const matchPassword = await bcrypt.compare(password, user.password)

    if (!matchPassword) {
      return next(createHttpError(401, 'Invalid email/password'))
    }

    const token = await jwt.sign(
      { name: user.name, email: user.email, userId: user._id },
      process.env.JWT_KEY!,
      { expiresIn: '7d' }
    )

    res.cookie('jwt', token)
    res.status(200).json({ token })
  } catch (error) {
    console.log('signInError =>', error)
    return next(createHttpError.InternalServerError)
  }
}
