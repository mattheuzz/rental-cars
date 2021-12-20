import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/autheticateEnsurence'
import { CreateSpecificationController } from '../modules/cars/useCase/createSpecifications/CreateSpecificationController'



const createSpecificationController = new CreateSpecificationController()

const specificationRoutes = Router()
specificationRoutes.use(ensureAuthenticated)

specificationRoutes.post('/', createSpecificationController.handle)


export { specificationRoutes }
