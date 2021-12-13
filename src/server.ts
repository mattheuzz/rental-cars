import express from 'express'
import "./database"
import "./shared/container"
import { router } from './routes'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'

const app = express()
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(router)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
