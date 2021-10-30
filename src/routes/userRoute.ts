import express from 'express'
import userController from '../controllers/userController'
import { userControllerValidation } from '../validation/usersValidation/userValidation'

const router = express.Router()

router.route('/').post(userControllerValidation, userController)

export default router
