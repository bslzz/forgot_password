import Joi from 'joi'

export const userSchema = {
  signUpUser: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  signInUser: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
}
