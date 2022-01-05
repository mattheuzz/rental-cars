import { CreateCarController } from '@modules/cars/useCase/createCars/CreateCarsController'
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/autheticateEnsurence'

export const carsRoutes = Router()

carsRoutes.use(ensureAuthenticated)

const createCarController = new CreateCarController()

carsRoutes.post('/', createCarController.handle)
