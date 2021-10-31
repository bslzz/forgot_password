import express from 'express'
import signUpUser from '../controllers/signUpUser.controller'
import { signUpUserValidation } from '../validation/usersValidation/signUpUserValidation'

const router = express.Router()

router.route('/signup').post(signUpUserValidation, signUpUser)

export default router
