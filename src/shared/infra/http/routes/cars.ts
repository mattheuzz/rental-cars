import { CreateCarController } from '@modules/cars/useCase/createCars/CreateCarsController'
import { CreateCarSpecificationController } from '@modules/cars/useCase/createCarSpecification/CreateCarEspecificationController'
import { ListCarsController } from '@modules/cars/useCase/listCars/ListCarsController'
import { UploadCarImageController } from '@modules/cars/useCase/uploadCarImage/uploadCarImageController'
import { Router } from 'express'
import uploadConfig from '../../../../config/upload'
import multer from 'multer'
import { ensureAuthenticated } from '../middlewares/autheticateEnsurence'
import { ensureAdmin } from '../middlewares/ensureAdmin'

export const carsRoutes = Router()

const createCarController = new CreateCarController()
const listCarsController = new ListCarsController()
const createCarsSpecificationController = new CreateCarSpecificationController()
const uploadCarImageController = new UploadCarImageController()
const upload = multer(uploadConfig.upload("./tmp/cars"))

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)

carsRoutes.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarsSpecificationController.handle)

carsRoutes.get('/availables', listCarsController.handle)

carsRoutes.post('/images/:id', ensureAuthenticated, ensureAdmin, upload.array("image"),uploadCarImageController.handle)
