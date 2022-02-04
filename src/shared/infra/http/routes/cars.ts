import { CreateCarController } from '@modules/cars/useCase/createCars/CreateCarsController'
import { CreateCarSpecificationController } from '@modules/cars/useCase/createCarSpecification/CreateCarEspecificationController'
import { ListCarsController } from '@modules/cars/useCase/listCars/ListCarsController'
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/autheticateEnsurence'
import { ensureAdmin } from '../middlewares/ensureAdmin'

export const carsRoutes = Router()

const createCarController = new CreateCarController()
const listCarsController = new ListCarsController()
const createCarsSpecificationController = new CreateCarSpecificationController()

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)

carsRoutes.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarsSpecificationController.handle)

carsRoutes.get('/avaliables', listCarsController.handle)
