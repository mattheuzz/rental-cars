import { Router } from 'express'
import * as multer from 'multer'
import { ensureAuthenticated } from '../middlewares/autheticateEnsurence'
import { CreateCategoryController } from '@modules/cars/useCase/createCategory/CreateCategoryController'
import { ImportCategoryController } from '@modules/cars/useCase/importCategory/ImportCategoryController'
import { ListCategorysController } from '@modules/cars/useCase/listCategory/ListCategorysController'


const upload = multer({
  dest: './tmp'
})

const categoriesRoutes = Router()

const createCategoryController = new CreateCategoryController()

const importCategoryController = new ImportCategoryController()

const listCategorysController = new ListCategorysController()

categoriesRoutes.use(ensureAuthenticated)

categoriesRoutes.post('/', createCategoryController.handle)

categoriesRoutes.get('/', listCategorysController.handle)

categoriesRoutes.post('/imports', upload.single("file"), importCategoryController.handle)

export { categoriesRoutes }
