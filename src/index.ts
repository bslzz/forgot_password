import express, { ErrorRequestHandler, Request, Response } from 'express'
import { Server } from 'http'
import createHttpError from 'http-errors'

const app = express()

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'This is from server'
  })
})

app.use((req, res, next) => {
  next(new createHttpError.NotFound())
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(err.status || 500).json({
    message: err.message
  })
}

app.use(errorHandler)

const PORT: Number = Number(process.env.PORT) || 5000

const server: Server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
)
