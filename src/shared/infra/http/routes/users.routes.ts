import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../../../../config/upload'
import { ensureAuthenticated } from '../middlewares/autheticateEnsurence'
import { CreateUserController } from '@modules/accounts/useCases/createUser/controller'
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/controller'
import { ProfileUserController } from '@modules/accounts/useCases/profileUser/profileUserController'

const usersRoutes = Router()

const createUserController = new CreateUserController()
const updateUserAvatarcontroller = new UpdateUserAvatarController()
const profileUserController = new ProfileUserController()

const uploadAvatar = multer(uploadConfig)

usersRoutes.post('/', createUserController.handler)

usersRoutes.get('/', ensureAuthenticated, profileUserController.handle)

usersRoutes.patch('/avatar', ensureAuthenticated, uploadAvatar.single('avatar'), updateUserAvatarcontroller.handler)

export { usersRoutes }