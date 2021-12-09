import { Router } from 'express'
import multer from 'multer'
import createCategoryController from '../modules/cars/useCase/createCategory'
import { importCategoryController } from '../modules/cars/useCase/importCategory'
import { listCategoryUseCaseController } from '../modules/cars/useCase/listCategory'

const upload = multer({
  dest: './tmp'
})

const categoriesRoutes = Router()

categoriesRoutes.post('/', (req, res) =>{
  return createCategoryController().handle(req, res)
})

categoriesRoutes.get('/', (req, res) => {
    return listCategoryUseCaseController.handle(req, res)
})

categoriesRoutes.post('/imports', upload.single('file'), (req, res) => {
  return importCategoryController.handle(req, res)
})

export { categoriesRoutes }
