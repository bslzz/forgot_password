import { RequestHandler } from 'express'
import validator from '../utils/validator'
import { userSchema } from './userSchema'

export const signUpUserValidation: RequestHandler = (req, res, next) => {
  validator(userSchema.signUpUser, req.body, next)
}
export const signInUserValidation: RequestHandler = (req, res, next) => {
  validator(userSchema.signInUser, req.body, next)
}
export const sendVerificationEmailValidation: RequestHandler = (
  req,
  res,
  next
) => {
  validator(userSchema.sendVerificationEmail, req.body, next)
}
export const verifyUserEmailValidation: RequestHandler = (req, res, next) => {
  validator(userSchema.verifyUserEmail, req.body, next)
}
export const sendForgotPasswordEmailValidation: RequestHandler = (
  req,
  res,
  next
) => {
  validator(userSchema.sendForgotPasswordEmail, req.body, next)
}
export const verifyNewPasswordValidation: RequestHandler = (req, res, next) => {
  validator(userSchema.verifyNewPassword, req.body, next)
}
