import { CreateRentalController } from '@modules/rentals/useCase/createRentals/CreateRentalController'
import { DevolutionController } from '@modules/rentals/useCase/devolution/DevolutionController'
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/autheticateEnsurence'
import { ensureAdmin } from '../middlewares/ensureAdmin'

export const rentalsRoutes = Router()

const createRentalController = new CreateRentalController()
const devolution = new DevolutionController()

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle)
rentalsRoutes.post('/:id/devolution', ensureAuthenticated, devolution.handle)
