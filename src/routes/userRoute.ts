import express from 'express'
import {
  logOutUser,
  signInUser,
  signUpUser
} from '../controllers/authUser.controller'
import {
  signInUserValidation,
  signUpUserValidation
} from '../validation/usersValidation/userValidation'

const router = express.Router()

router.route('/signup').post(signUpUserValidation, signUpUser)
router.route('/login').post(signInUserValidation, signInUser)
router.route('/logout').get(logOutUser)

export default router
