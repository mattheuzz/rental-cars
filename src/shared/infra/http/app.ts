import express, { Request, Response, NextFunction } from 'express'
import "dotenv/config"
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../../../swagger.json'
import "express-async-errors"
import cretaeConnection from "@shared/infra/typeorm"
import "@shared/container"
import { router } from '@shared/infra/http/routes'
import { AppError } from '@errors/error'
import upload from '@config/upload'


cretaeConnection()

const app = express()
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`) )
app.use('/cars', express.static(`${upload.tmpFolder}/cars`) )

app.use(router)

app.use((e: AppError, req: Request, res: Response, next: NextFunction) =>{
  if (e instanceof AppError){
    return res.status(e.statusCode).json({
      message: e.message
    })
  }
  return res.status(500).json({
    message: 'Internal Server Error'
  })
})

export { app }
