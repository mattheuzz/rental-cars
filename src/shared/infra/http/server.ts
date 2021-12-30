import express, { Request, Response, NextFunction } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../../../swagger.json'
import "express-async-errors"
import "@shared/infra/typeorm"
import "@shared/container"
import { router } from '@shared/infra/http/routes'
import { AppError } from '@errors/error'

const app = express()
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
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

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
