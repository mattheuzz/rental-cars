import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/autheticateEnsurence'
import { CreateSpecificationController } from '@modules/cars/useCase/createSpecifications/CreateSpecificationController'
import { ensureAdmin } from '../middlewares/ensureAdmin'



const createSpecificationController = new CreateSpecificationController()

const specificationRoutes = Router()
specificationRoutes.use(ensureAuthenticated)

specificationRoutes.post('/', ensureAdmin, ensureAuthenticated,createSpecificationController.handle)


export { specificationRoutes }
