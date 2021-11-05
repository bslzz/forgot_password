import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'

export const auth: RequestHandler = (req: any, res, next) => {
  try {
    const token = req.cookies?.jwt
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const verifiedUser: any = jwt.verify(token, process.env.JWT_KEY!)
    req.user = verifiedUser.userId
    next()
  } catch (error: any) {
    return next(createHttpError(401, error.message))
  }
}
