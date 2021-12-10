import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import createHttpError from 'http-errors'
import cookieParser from 'cookie-parser'
import CONNECT_DB from './config/db'
import userRoute from './routes/userRoute'
import sendVerificationEmailRoute from './routes/emailVerificationRoute'
import sendForgotPasswordEmailRoute from './routes/forgotPasswordEmailRoute'
import customerControllerRoute from './routes/customerRoute'
import { errorHandler } from './middleware/errorHandler'

dotenv.config()
const app = express()

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: 'http://localhost:3000'
  })
)

// connect db
CONNECT_DB()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

// routes
app.use('/users', userRoute)
app.use('/', sendVerificationEmailRoute)
app.use('/', sendForgotPasswordEmailRoute)
app.use('/customer', customerControllerRoute)

// errorhandler middleware
app.use(() => {
  throw createHttpError(404, 'Page not found')
})

app.use(errorHandler)

// initiate server
const PORT: Number = Number(process.env.PORT!) || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
