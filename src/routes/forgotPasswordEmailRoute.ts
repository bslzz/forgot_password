import express from 'express'
import {
  sendForgotPasswordEmail,
  verifyNewPassword
} from '../controllers/forgotPasswordEmail.controller'
import {
  sendForgotPasswordEmailValidation,
  verifyNewPasswordValidation
} from '../validation/usersValidation/userValidation'

const router = express.Router()

router
  .route('/forgot_password_verification')
  .post(sendForgotPasswordEmailValidation, sendForgotPasswordEmail)
router
  .route('/verify_password')
  .post(verifyNewPasswordValidation, verifyNewPassword)

export default router
