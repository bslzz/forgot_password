import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import User from '../models/userSchema'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { transporter } from '../config'

export const sendVerificationEmail: RequestHandler = async (req, res, next) => {
  const { email }: { email: string } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return next(createHttpError(404, 'Invalid Email'))
    }
    if (user.isVerified) {
      return next(createHttpError(406, 'User already verified'))
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
      subject: 'Email verification ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: `Your verification link is <a href = "${process.env
        .FRONTEND_URL!}/forgot_password_verify/${jwtToken}"> Link </a>` // html body
    })

    await User.updateOne({ $set: { verifyToken: hashedToken } })

    res.json({
      message: `Preview URL: %s ${nodemailer.getTestMessageUrl(info)}`
    })
  } catch (error) {
    console.log('sendVerificationEmail =>', error)
    return next(createHttpError.InternalServerError)
  }
}
