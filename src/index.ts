import express, { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import dotenv from 'dotenv'
import CONNECT_DB from './config/db'
import userRoute from './routes/userRoute'
import sendVerificationEmailRoute from './routes/emailVerification'
import sendForgotPasswordEmail from './routes/forgotPasswordEmail'
import { errorHandler } from './middleware/errorHandler'

dotenv.config()
const app = express()

// middleware
app.use(express.json())

// connect db
CONNECT_DB()

// routes
app.use('/users', userRoute)
app.use('/', sendVerificationEmailRoute)
app.use('/', sendForgotPasswordEmail)

// errorhandler middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound())
})

app.use(errorHandler)

// initiate server
const PORT: Number = Number(process.env.PORT!) || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
