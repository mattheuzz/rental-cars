import { CreateRentalController } from '@modules/rentals/useCase/createRentals/CreateRentalController'
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/autheticateEnsurence'
import { ensureAdmin } from '../middlewares/ensureAdmin'

export const rentalsRoutes = Router()

const createRentalController = new CreateRentalController()

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle)
