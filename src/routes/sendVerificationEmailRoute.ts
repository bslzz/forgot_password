import express from 'express'
import { sendVerificationEmail } from '../controllers/sendVerificationEmail'

const router = express.Router()

router.route('/send_verification_email').post(sendVerificationEmail)

export default router
