import { Router } from 'express'
import { SpecificationRepository } from '../modules/cars/repositories/Specification'
import { CreateSpecification } from '../modules/cars/services/CreateSpecification'

const specificationRoutes = Router()
const specification = new SpecificationRepository

specificationRoutes.post('/', (req, res) => {
  const { name, description} = req.body

  if(!name || !description){
    return res
    .status(400)
    .json({
      error: "Name and Description are required"
    })
  }

  const creatSpecificatioServices = new CreateSpecification(specification)
  creatSpecificatioServices.execute({ name, description })

  return res
  .status(201)
  .send()
})

specificationRoutes.get('/', (req, res) => {
  const all = specification.list()

  return res
  .status(200)
  .send(all)
})

export { specificationRoutes }
