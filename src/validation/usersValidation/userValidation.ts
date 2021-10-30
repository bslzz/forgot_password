import { RequestHandler } from 'express'
import validator from '../utils/validator'
import { userSchema } from './userSchema'

export const userControllerValidation: RequestHandler = (req, res, next) => {
  validator(userSchema.userController, req.body, next)
}
