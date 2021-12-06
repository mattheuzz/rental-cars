import { Router } from 'express'
import { createSpecificationController } from '../models/cars/useCase/createSpecifications'
import { specificationsController } from '../models/cars/useCase/listSppecification'


const specificationRoutes = Router()


specificationRoutes.post('/', (req, res) => {
  return createSpecificationController.handle(req, res)
})

specificationRoutes.get('/', (req, res) => {
  return specificationsController.handle(req, res)
})

export { specificationRoutes }
