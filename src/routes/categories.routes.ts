import { Router } from 'express'
import { createCategoryController } from '../modules/cars/useCase/createCategory'
import { listCategoryUseCaseController } from '../modules/cars/useCase/listCategory'

const categoriesRoutes = Router()

categoriesRoutes.post('/', (req, res) =>{
  return createCategoryController.handle(req, res)
})

categoriesRoutes.get('/', (req, res) => {
    return listCategoryUseCaseController.handle(req, res)
})

export { categoriesRoutes }
