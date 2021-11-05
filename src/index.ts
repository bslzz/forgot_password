import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import createHttpError, { HttpError } from 'http-errors'
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

// connect db
CONNECT_DB()

// routes
app.use('/users', userRoute)
app.use('/', sendVerificationEmailRoute)
app.use('/', sendForgotPasswordEmailRoute)
app.use('/customer', customerControllerRoute)

// errorhandler middleware
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound())
})

app.use(errorHandler)

// initiate server
const PORT: Number = Number(process.env.PORT!) || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
