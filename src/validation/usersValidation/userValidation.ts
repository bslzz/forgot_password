import { RequestHandler } from 'express'
import validator from '../utils/validator'
import { userSchema } from './userSchema'

export const signUpUserValidation: RequestHandler = (req, res, next) => {
  validator(userSchema.signUpUser, req.body, next)
}
export const signInUserValidation: RequestHandler = (req, res, next) => {
  validator(userSchema.signInUser, req.body, next)
}
