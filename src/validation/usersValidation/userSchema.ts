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
  }),
  sendVerificationEmail: Joi.object({
    email: Joi.string().email().required()
  }),
  verifyUserEmail: Joi.object({
    token: Joi.string().required()
  }),
  sendForgotPasswordEmail: Joi.object({
    email: Joi.string().email().required()
  }),
  verifyNewPassword: Joi.object({
    token: Joi.string().required(),
    password: Joi.string().required()
  })
}
