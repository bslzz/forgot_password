import Joi from 'joi'

export const userSchema = {
  signUpUser: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    isUserVerified: Joi.boolean()
  })
}
