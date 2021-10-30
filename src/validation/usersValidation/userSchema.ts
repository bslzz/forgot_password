import Joi from 'joi'

export const userSchema = {
  userController: Joi.object({
    name: Joi.string().required(),
    id: Joi.string().required()
  })
}
