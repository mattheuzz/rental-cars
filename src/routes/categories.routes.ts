import { Router } from 'express'
import multer from 'multer'
import { createCategoryController } from '../entities/cars/useCase/createCategory'
import { importCategoryController } from '../entities/cars/useCase/importCategory'
import { listCategoryUseCaseController } from '../entities/cars/useCase/listCategory'

const upload = multer({
  dest: './tmp'
})

const categoriesRoutes = Router()

categoriesRoutes.post('/', (req, res) =>{
  return createCategoryController.handle(req, res)
})

categoriesRoutes.get('/', (req, res) => {
    return listCategoryUseCaseController.handle(req, res)
})

categoriesRoutes.post('/imports', upload.single('file'), (req, res) => {
  return importCategoryController.handle(req, res)
})

export { categoriesRoutes }
