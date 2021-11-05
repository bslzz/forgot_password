import express from 'express'
import {
  sendVerificationEmail,
  verifyUserEmail
} from '../controllers/emailVerification'
import {
  sendVerificationEmailValidation,
  verifyUserEmailValidation
} from '../validation/usersValidation/userValidation'

const router = express.Router()

router
  .route('/send_verification_email')
  .post(sendVerificationEmailValidation, sendVerificationEmail)
router.route('/verify_email').post(verifyUserEmailValidation, verifyUserEmail)

export default router
