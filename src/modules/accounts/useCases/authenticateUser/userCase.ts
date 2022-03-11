import * as dotenv from "dotenv"
import { inject, injectable } from "tsyringe"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken";
import { IRequest, IResponse } from "@modules/accounts/interfaces/IAuthenticate"
import { IUserRepository } from "@modules/accounts/interfaces/IUser"
import { UsersRepositorys } from "@modules/accounts/repositories/Users"
import { AppError } from "@errors/error"

dotenv.config()


@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject(UsersRepositorys)
    private usersRepository: IUserRepository 
  ) {

  } 

  async execute({ email, password }: IRequest ): Promise<IResponse> {
    
    const user = await this.usersRepository.findByEmail(email)
    if(!user){
      throw new AppError('Email or password invalid', 401)
    }

    const passwordMatched = await compare(password, user.password)
    if (!passwordMatched) {
      throw new AppError('Email or password invalid', 401)
    }

    const token = sign({}, process.env.JWT as string, {
      subject: user.id,
      expiresIn: "1d"
    })

    return {
      user: {
        name: user.name,
        email: user.email
      },
      token
    }

  }
}

export { AuthenticateUserUseCase }