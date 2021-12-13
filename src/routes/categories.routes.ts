import { Router } from 'express'
import multer from 'multer'
import { CreateCategoryController } from '../modules/cars/useCase/createCategory/CreateCategoryController'
import { ImportCategoryController } from '../modules/cars/useCase/importCategory/ImportCategoryController'
import { ListCategorysController } from '../modules/cars/useCase/listCategory/ListCategorysController'


const upload = multer({
  dest: './tmp'
})

const categoriesRoutes = Router()

const createCategoryController = new CreateCategoryController()

const importCategoryController = new ImportCategoryController()

const listCategorysController = new ListCategorysController()

categoriesRoutes.post('/', createCategoryController.handle)

categoriesRoutes.get('/', listCategorysController.handle)

categoriesRoutes.post('/imports', importCategoryController.handle)

export { categoriesRoutes }
