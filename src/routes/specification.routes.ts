import { Router } from 'express'
import { createSpecificationController } from '../entities/cars/useCase/createSpecifications'
import { specificationsController } from '../entities/cars/useCase/listSppecification'


const specificationRoutes = Router()


specificationRoutes.post('/', (req, res) => {
  return createSpecificationController.handle(req, res)
})

specificationRoutes.get('/', (req, res) => {
  return specificationsController.handle(req, res)
})

export { specificationRoutes }
