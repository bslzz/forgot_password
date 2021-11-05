import express from 'express'
import {
  createNewCustomerController,
  getAllCustomersController
} from '../controllers/customer.controller'
import { auth } from '../middleware/auth'

const router = express.Router()

// auth has access to the user so it passes the req.user to createNewCustomerController. Hence createNewCustomerController can get access to the user
router.route('/').post(auth, createNewCustomerController)
router.route('/all').get(auth, getAllCustomersController)

export default router
