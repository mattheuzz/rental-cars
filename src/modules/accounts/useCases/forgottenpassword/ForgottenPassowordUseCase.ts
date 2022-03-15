import { AppError } from "@errors/error"
import { UsersRepositorys } from "@modules/accounts/repositories/Users"
import { UsersTokenRepository } from "@modules/accounts/repositories/UsersToken"
import { DayJsDateProvider } from "@shared/container/providers/Date/implementations/DayJsDateProvider"
import { inject, injectable } from "tsyringe"
import { v4 as uuidV4 } from "uuid"

@injectable()
export class ForgottenPaasowrdUseCase {
  constructor(
    @inject(UsersRepositorys)
    private usersRepositorys: UsersRepositorys,
    @inject(UsersTokenRepository)
    private usersTokenRepository: UsersTokenRepository,
    @inject(DayJsDateProvider)
    private dateProvider: DayJsDateProvider,
  ) {}
  async execute(email: string) {
    const user = await this.usersRepositorys.findByEmail(email)
    if (!user) {
      throw new AppError('User not found', 404)
    }
    const token = uuidV4()
    await this.usersTokenRepository.create({
      user_id: user.id as string,
      refresh_token: token,
      expires_date: this.dateProvider.addHours(3),
    })

  }
}
