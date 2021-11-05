import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'
import { transporter } from '../config'
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'
import User from '../models/userSchema'

export const sendForgotPasswordEmail: RequestHandler = async (
  req,
  res,
  next
) => {
  const { email }: { email: string } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return next(createHttpError(404, 'Invalid Email'))
    }

    const hashedToken = await bcrypt.hash(user._id.toString(), 10)
    const jwtToken = await jwt.sign(
      { userId: user._id },
      process.env.JWT_KEY!,
      { expiresIn: '60m' }
    )

    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: email, // list of receivers
      subject: 'New Password verification ✔', // Subject line
      html: `Your verification link is <a href = "${process.env
        .FRONTEND_URL!}/forgot_password_verify/${jwtToken}"> Link </a>` // html body
    })

    await User.updateOne({ $set: { verifyToken: hashedToken } })

    res.json({
      message: `Preview URL: %s ${nodemailer.getTestMessageUrl(info)}`
    })
  } catch (error) {
    console.log('sendForgotPasswordEmail =>', error)
    return next(createHttpError.InternalServerError)
  }
}

export const verifyNewPassword: RequestHandler = async (req, res, next) => {
  const { token, password }: { token: string; password: string } = req.body
  try {
    const decodedToken: any = jwt.verify(token, process.env.JWT_KEY!)
    if (!decodedToken) {
      return next(createHttpError(401, 'Unauthorized'))
    }

    const user = await User.findById(decodedToken.userId)

    if (!user) {
      return next(createHttpError(401, 'Unauthorized'))
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await user.updateOne({
      $set: { password: hashedPassword },
      $unset: { verifyToken: 0 }
    })

    res.json({ message: 'Password changed' })
  } catch (error) {
    console.log('verifyNewPassword =>', error)
    return next(createHttpError(401, 'Invalid token'))
  }
}
