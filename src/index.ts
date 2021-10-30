import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response
} from 'express'
import { Server } from 'http'
import createHttpError from 'http-errors'
import dotenv from 'dotenv'
import CONNECT_DB from './config/db'
import userRoute from './routes/userRoute'
import { errorHandler } from './middleware/errorHandler'

dotenv.config()
const app = express()
app.use(express.json())

CONNECT_DB()

app.use('/users', userRoute)

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound())
})

app.use(errorHandler)

const PORT: Number = Number(process.env.PORT!) || 5000

const server: Server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
)
