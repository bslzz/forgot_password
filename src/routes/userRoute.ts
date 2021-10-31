import express from 'express'
import { signInUser, signUpUser } from '../controllers/signUpUser.controller'
import {
  signInUserValidation,
  signUpUserValidation
} from '../validation/usersValidation/userValidation'

const router = express.Router()

router.route('/signup').post(signUpUserValidation, signUpUser)
router.route('/login').post(signInUserValidation, signInUser)

export default router
