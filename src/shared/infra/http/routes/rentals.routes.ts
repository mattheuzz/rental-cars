import { CreateRentalController } from '@modules/rentals/useCase/createRentals/CreateRentalController'
import { DevolutionController } from '@modules/rentals/useCase/devolution/DevolutionController'
import { ListByUserController } from '@modules/rentals/useCase/list/listByUser/listByUserController'
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/autheticateEnsurence'
import { ensureAdmin } from '../middlewares/ensureAdmin'

export const rentalsRoutes = Router()

const createRentalController = new CreateRentalController()
const devolution = new DevolutionController()
const listByUser = new ListByUserController()

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle)
rentalsRoutes.post('/:id/devolution', ensureAuthenticated, devolution.handle)
rentalsRoutes.get('/user', ensureAdmin, listByUser.handle)
