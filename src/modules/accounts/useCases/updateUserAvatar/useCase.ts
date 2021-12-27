import { inject, injectable } from 'tsyringe'
import { UsersRepositorys } from '../../repositories/Users'
import { IRequestUpdateAvatar } from '../../interfaces/IUpdateAvatar'
import { deleteFile } from '../../../../utils/file'
import { IUserRepository } from '../../interfaces/IUser'
import { AppError } from '../../../../errors/error'

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject(UsersRepositorys)
    private usersRepository: IUserRepository
  ){}

  async execute ({ user_id, avatar }: IRequestUpdateAvatar): Promise<void> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    if (!user.avatar) {
      throw new AppError('Avatar is required', 400)
    }

    await deleteFile(`./tmp/avatar/${user.avatar}`)

    user.avatar = avatar
    await this.usersRepository.create(user)
  }
}

export { UpdateUserAvatarUseCase }