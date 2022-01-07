import { Router } from 'express'
import multer from 'multer'
import { ensureAuthenticated } from '../middlewares/autheticateEnsurence'
import { CreateCategoryController } from '@modules/cars/useCase/createCategory/CreateCategoryController'
import { ImportCategoryController } from '@modules/cars/useCase/importCategory/ImportCategoryController'
import { ListCategorysController } from '@modules/cars/useCase/listCategory/ListCategorysController'
import { ensureAdmin } from '../middlewares/ensureAdmin'


const upload = multer({
  dest: './tmp'
})

const categoriesRoutes = Router()

const createCategoryController = new CreateCategoryController()

const importCategoryController = new ImportCategoryController()

const listCategorysController = new ListCategorysController()


categoriesRoutes.post('/', ensureAdmin, ensureAuthenticated, createCategoryController.handle)

categoriesRoutes.get('/', listCategorysController.handle)

categoriesRoutes.post('/imports', ensureAdmin, ensureAuthenticated, upload.single("file"), importCategoryController.handle)

export { categoriesRoutes }
