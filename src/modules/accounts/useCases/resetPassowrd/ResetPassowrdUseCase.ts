import { AppError } from "@errors/error";
import { UsersRepositorys } from "@modules/accounts/repositories/Users";
import { UsersTokenRepository } from "@modules/accounts/repositories/UsersToken";
import { DayJsDateProvider } from "@shared/container/providers/Date/implementations/DayJsDateProvider";
import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

interface IResetPassowrd {
  token: string;
  password: string;
}

@injectable()
export class ResetPassowrdUseCase {
  constructor(
    @inject(UsersTokenRepository)
    private usersTokenRepository: UsersTokenRepository,
    @inject(DayJsDateProvider)
    private dateProvider: DayJsDateProvider,
    @inject(UsersRepositorys)
    private usersRepositorys: UsersRepositorys
  ) {}
  
  async execute({ token, password }: IResetPassowrd): Promise<void> {
    const usersToken = await this.usersTokenRepository.findByToken(token)
    if (!usersToken) {
      throw new AppError("Invalid token", 401)
    }

    const isValid = this.dateProvider.compareIfBefore(usersToken.expires_date, this.dateProvider.dateNow())
    if(!isValid) {
      throw new AppError("Token expired", 401)
    }

    const user = await this.usersRepositorys.findById(usersToken.user_id)
    user.password = await hash(password, 8)

    await this.usersRepositorys.create({
      name: user.name,
      password: user.password,
      email: user.email,
      driver_license: user.driver_license,
      id: user.id,
      avatar: user.avatar
    })

    await this.usersTokenRepository.deleteById(usersToken.id)

  }
}
