import { inject, injectable } from 'tsyringe'
import { UsersRepositorys } from '@modules/accounts/repositories/Users'
import { IRequestUpdateAvatar } from '@modules/accounts/interfaces/IUpdateAvatar'
import { IUserRepository } from '@modules/accounts/interfaces/IUser'
import { AppError } from '@errors/error'
import { IStorageProvider } from '@shared/container/providers/Storage/IStorage'

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject(UsersRepositorys)
    private usersRepository: IUserRepository,
    @inject("LocalStorageProvider")
    private localStorageProvider: IStorageProvider
  ){}

  async execute ({ user_id, avatar_file }: IRequestUpdateAvatar): Promise<void> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    if (user.avatar) {
      await this.localStorageProvider.delete(user.avatar, "avatar")
    }
    
    await this.localStorageProvider.save(
      avatar_file, "avatar"
    )
    user.avatar = avatar_file as string
    await this.usersRepository.create(user)
  }
}

export { UpdateUserAvatarUseCase }