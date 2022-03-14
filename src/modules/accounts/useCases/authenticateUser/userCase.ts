import * as dotenv from "dotenv"
import { inject, injectable } from "tsyringe"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken";
import { IRequest, IResponse } from "@modules/accounts/interfaces/IAuthenticate"
import { IUserRepository } from "@modules/accounts/interfaces/IUser"
import { UsersRepositorys } from "@modules/accounts/repositories/Users"
import { AppError } from "@errors/error"
import { UsersTokenRepository } from "@modules/accounts/repositories/UsersToken";
import { IUsersTokenRepository } from "@modules/accounts/interfaces/IUsersToken";
import auth from "@config/auth";
import { DayJsDateProvider } from "@shared/container/providers/Date/implementations/DayJsDateProvider";
import { IDateProvider } from "@shared/container/providers/Date/IDateProvider";

dotenv.config()


@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject(UsersRepositorys)
    private usersRepository: IUserRepository,
    @inject(UsersTokenRepository)
    private usersTokenRepository: IUsersTokenRepository,
    @inject(DayJsDateProvider)
    private dateProvider: IDateProvider
  ){}

  async execute({ email, password }: IRequest ): Promise<IResponse> {
    
    const user = await this.usersRepository.findByEmail(email)
    const { expires_in_token, expires_in_refresh_token, expires_in_refresh_token_days} = auth
    if(!user){
      throw new AppError('Email or password invalid', 401)
    }

    const passwordMatched = await compare(password, user.password)
    if (!passwordMatched) {
      throw new AppError('Email or password invalid', 401)
    }
    
    const token = sign({}, process.env.JWT as string, {
      subject: user.id,
      expiresIn: expires_in_token
    })

    const refresh_token_expires_date = this.dateProvider.addDays(expires_in_refresh_token_days)
    
    const refresh_token = sign({ email }, process.env.JWTREFRESH as string, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    })

    await this.usersTokenRepository.create({
      user_id: user.id as string,
      expires_date: refresh_token_expires_date,
      refresh_token,
    })

    return {
      user: {
        name: user.name,
        email: user.email
      },
      token,
      refresh_token
    }

  }
}

export { AuthenticateUserUseCase }