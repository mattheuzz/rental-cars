import { Router } from 'express'
import * as multer from 'multer'
import uploadConfig from '../../../../config/upload'
import { ensureAuthenticated } from '../middlewares/autheticateEnsurence'
import { CreateUserController } from '@modules/accounts/useCases/createUser/controller'
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/controller'

const usersRoutes = Router()

const createUserController = new CreateUserController()
const updateUserAvatarcontroller = new UpdateUserAvatarController()

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))

usersRoutes.post('/', createUserController.handler)

usersRoutes.patch('/avatar', ensureAuthenticated, uploadAvatar.single('avatar'), updateUserAvatarcontroller.handler)

export { usersRoutes }