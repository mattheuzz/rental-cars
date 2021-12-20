import express, { Request, Response, NextFunction } from 'express'
import "express-async-errors"
import "./database"
import "./shared/container"
import { router } from './routes'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'
import { AppError } from './errors/error'

const app = express()
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(router)

app.use((e: Error, req: Request, res: Response, next: NextFunction) =>{
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
