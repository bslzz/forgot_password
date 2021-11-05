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
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

export const signInUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return next(createHttpError(404, 'User Not Found'))
    }
    if (!user.isVerified) {
      return next(createHttpError(406, 'User Not Verified'))
    }
    const matchPassword = await bcrypt.compare(password, user.password)

    if (!matchPassword) {
      return next(createHttpError(401, 'Invalid email/password'))
    }

    const token = await jwt.sign(
      { name: user.name, email: user.email, userId: user._id },
      process.env.JWT_KE!,
      { expiresIn: '7d' }
    )

    res.cookie('jwt', token, {
      httpOnly: true
    })
    res.status(200).json({ token })
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}
