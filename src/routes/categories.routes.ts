import { Router } from 'express'
import { CategoryRepository } from '../modules/cars/repositories/Category'
import { CreateCategoryService } from '../modules/cars/useCase/createCategory/CreateCategoryUseCase'

const categoriesRoutes = Router()
const categoryRepository = new CategoryRepository()

categoriesRoutes.post('/', (req, res) =>{
  const { name, description } = req.body

  if (!name || !description) {
    return res
    .status(400)
    .json({
      error: "Name and description are required"
    })
  }

  const createCategoryService = new CreateCategoryService(categoryRepository)
  createCategoryService.execute({ name, description })

  return res.status(201).send()
})

categoriesRoutes.get('/', (req, res) => {
    const all = categoryRepository.list()

    return res.json(all)
})

export { categoriesRoutes }
