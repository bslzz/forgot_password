import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import { IUser } from '../@types'
import User from '../models/userSchema'

const userController: RequestHandler = async (req, res, next) => {
  const { name, id }: IUser = req.body
  try {
    const nameExists = await User.findOne({ name })
    if (nameExists) {
      return next(createHttpError(406, 'Name already exists'))
    }
    const user = new User({
      name,
      id
    })

    await user.save()
    res.status(200).json({ message: 'user saved' })
  } catch (error) {
    return next(createHttpError.InternalServerError)
  }
}

export default userController
