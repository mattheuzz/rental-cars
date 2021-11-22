import { Router } from 'express'
import { createSpecificationController } from '../modules/cars/useCase/createSpecifications'
import { specificationsController } from '../modules/cars/useCase/listSppecification'


const specificationRoutes = Router()


specificationRoutes.post('/', (req, res) => {
  return createSpecificationController.handle(req, res)
})

specificationRoutes.get('/', (req, res) => {
  return specificationsController.handle(req, res)
})

export { specificationRoutes }
