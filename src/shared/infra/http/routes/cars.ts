import { CreateCarController } from '@modules/cars/useCase/createCars/CreateCarsController'
import { ListCarsController } from '@modules/cars/useCase/listCars/ListCarsController'
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/autheticateEnsurence'
import { ensureAdmin } from '../middlewares/ensureAdmin'

export const carsRoutes = Router()

const createCarController = new CreateCarController()
const listCarsController = new ListCarsController()

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)

carsRoutes.get('/avaliables', listCarsController.handle)
