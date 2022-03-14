import { sign, verify } from "jsonwebtoken";
import { IUsersTokenRepository } from "@modules/accounts/interfaces/IUsersToken";
import { UsersTokenRepository } from "@modules/accounts/repositories/UsersToken";
import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/error";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/Date/IDateProvider";
import { DayJsDateProvider } from "@shared/container/providers/Date/implementations/DayJsDateProvider";

interface IPayload {
  sub: string
  email: string
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject(UsersTokenRepository)
    private usersTokenRepository: IUsersTokenRepository,
    @inject(DayJsDateProvider)
    private dateProvider: IDateProvider
  ) {}
  async execute(token: string): Promise<string> {
    const decode = verify(token, process.env.JWTREFRESH as string) as IPayload
    
    const user_id = decode.sub
    const email = decode.email

    const userTokens = await this.usersTokenRepository.findUserIdAndToken(user_id, token)

    if (!userTokens) {
      throw new AppError("User not found", 401)
    }

    await this.usersTokenRepository.deleteById(userTokens.id)

    const refresh_token = sign({ email }, process.env.JWTREFRESH as string, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token,
    })

    await this.usersTokenRepository.create({
      user_id,
      expires_date: this.dateProvider.addDays(auth.expires_in_refresh_token_days),
      refresh_token,
    })
    return refresh_token
  }
}
