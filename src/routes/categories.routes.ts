import { Router } from 'express'
import { CategoryRepository } from '../modules/cars/repositories/Category'
import { createCategoryController } from '../modules/cars/useCase/createCategory'

const categoriesRoutes = Router()
const categoryRepository = new CategoryRepository()

categoriesRoutes.post('/', (req, res) =>{
  return createCategoryController.handle(req, res)
})

categoriesRoutes.get('/', (req, res) => {
    const all = categoryRepository.list()

    return res.json(all)
})

export { categoriesRoutes }
